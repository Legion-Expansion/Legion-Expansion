var model;
var handlers = {};

$(document).ready(function () {
    
    var ITEMS_PER_ROW = 6;
    var ROWS_PER_TAB = 5;
    var ITEMS_PER_TAB = ITEMS_PER_ROW * ROWS_PER_TAB;
    
    function BuildItem(params) {
        var self = this;

        params = params || {};
        _.assign(this, params);
        self.count = ko.observable(0);
        self.hotkey = ko.observable('');
        self.empty = ko.observable(true);
        self.filled = ko.computed(function() { return !self.empty(); });
        self.active = ko.observable(false);
        self.visible = ko.observable(false);
        self.buildIcon = ko.observable(params.buildIcon || '');
    }
    
    function BuildTab(group, label) {
        var self = this;
        
        self.group = ko.observable(group);
        self.items = ko.observableArray();
        self.label = ko.observable(label);
        self.hotkey = ko.observable('');
        self.active = ko.observable(false);
        self.visible = ko.observable(false);
    }
    
    function BuildSet(params) {
        var units = params.units;
        var buildLists = params.buildLists;
        var grid = params.grid;
        var specTag = params.specTag;
        var self = this;
        
        // Maps a spec in the current selection to a build list
        self.selectedSpecs = ko.observable({});
        // Maps a build item spec id to a BuildItem
        self.buildItems = ko.observable({});
        // Maintains the tab list
        self.tabs = ko.observableArray([
            new BuildTab('factory', '!LOC(live_game_build_bar:factory.message):factory'),
            new BuildTab('combat', '!LOC(live_game_build_bar:combat.message):combat'),
            new BuildTab('utility', '!LOC(live_game_build_bar:utility.message):utility'),
            new BuildTab('vehicle', '!LOC(live_game_build_bar:vehicle.message):vehicle'),
            new BuildTab('bot', '!LOC(live_game_build_bar:bot.message):bot'),
            new BuildTab('air', '!LOC(live_game_build_bar:air.message):air'),
            new BuildTab('sea', '!LOC(live_game_build_bar:sea.message):sea'),
            new BuildTab('orbital', '!LOC(live_game_build_bar:orbital.message):orbital'),
            new BuildTab('ammo', '!LOC(live_game_build_bar:ammo.message):ammo')
        ]);
        var tabOrder = _.invert([
            'factory',
            'combat',
            'utility',
            'vehicle',
            'bot',
            'air',
            'sea',
            'orbital',
            'ammo'
        ]);
        var maxIndex = 0;
        _.forIn(grid, function(tabInfo, spec) {
            var unit = units[spec + specTag];
            if (!unit)
                return;
            var item = new BuildItem(unit);
            var tab = self.tabs()[tabOrder[item.buildGroup]];
            if (!tab)
            {
                tabOrder[item.buildGroup] = self.tabs().length;
                tab = new BuildTab(item.buildGroup);
                self.tabs().push(tab);
            }
            tab.items()[item.buildIndex] = item;
            self.buildItems()[unit.id] = item;
            maxIndex = Math.max(maxIndex, item.buildIndex);
        });
        _.forIn(self.tabs(), function(tab) {
            var items = tab.items();
            tab.items(_.times(ITEMS_PER_TAB, function(index) {
                return items[index] || new BuildItem();
            }));
        });

        self.selectedSpecs.subscribe(function(selected) {
            var items = self.buildItems();
            var visibleItems = {};
            _.forIn(items, function(item, spec) {
                item.visible(false);
                item.empty(true);
            });
            
            var tabs = self.tabs();
            var visibleTabs = {};
            _.forEach(tabs, function(tab) { 
                tab.visible(false);
            });
            
            if (_.isEmpty(selected))
                return;
            
            var minIndex = Infinity;
            _.forIn(selected, function(units, spec) {
                _.forEach(buildLists[spec], function(unit) {
                    var buildSpec = unit.id;
                    if (visibleItems[buildSpec])
                        return;
                    visibleItems[buildSpec] = true;
                    var item = items[buildSpec];
                    if (!item)
                        return;
                    item.visible(true);
                    item.empty(false);
                    minIndex = Math.min(unit.buildIndex, minIndex);
                    if (!visibleTabs[unit.buildGroup]) {
                        var tabIndex = tabOrder[item.buildGroup];
                        var tab = tabs[tabIndex];
                        visibleTabs[unit.buildGroup] = tab;
                        if (tab)
                            tab.visible(true);
                    }
                });
            });
            
            // Add empty items
            minIndex = Math.floor(minIndex / ITEMS_PER_ROW) * ITEMS_PER_ROW;
            _.forEach(visibleTabs, function(tab) {
                _.forEach(tab.items(), function(item, index) {
                    item.visible(index >= minIndex);
                });
            });
        });
        self.tabsByGroup = ko.computed(function() {
            return _.transform(self.tabs(), function(result, tab, index) {
                result[tab.group()] = tab;
            }, {});
        });
        
        self.empty = ko.computed(function() {
            return _.isEmpty(self.selectedSpecs());
        });
        
        self.buildLists = buildLists;
        
        self.parseSelection = function(selection) {
            var curSpecs = self.selectedSpecs();
            var removeSpecs = _.clone(curSpecs);
            var addSpecs = {};

            // Calculate the spec delta
            _.forIn(selection.spec_ids, function(count, id) {
                if (removeSpecs[id] || curSpecs[id]) {
                    delete removeSpecs[id];
                    return;
                }
                
                if (self.buildLists[id])
                    addSpecs[id] = self.buildLists[id];
            });
            
            var addEmpty = _.isEmpty(addSpecs);
            var removeEmpty = _.isEmpty(removeSpecs);
            if (!addEmpty || !removeEmpty) {
                if (!removeEmpty) {
                    _.forIn(removeSpecs, function(build, id) {
                        delete curSpecs[id];
                    });
                }
                if (!addEmpty) {
                    _.assign(curSpecs, addSpecs);
                }
                self.selectedSpecs.notifySubscribers(curSpecs);
            }
            
            // Update counts
            var buildItems = self.buildItems();
            var clears = _.transform(buildItems, function(result, item, id) { result[id] = item.count(); });
            _.forIn(selection.build_orders, function(count, id) {
                if (count)
                    delete clears[id];
                if (buildItems[id])
                    buildItems[id].count(count);
            });
            _.forIn(clears, function(value, id) {
                if (value)
                    buildItems[id].count(0);
            });
        };
        
        self.hasTab = function(group) {
            return !!self.tabsByGroup()[group];
        };
    }

    function BuildBarViewModel() {
        var self = this;
        
        self.unitSpecs = $.Deferred();
        self.getSpecTag = api.game.getUnitSpecTag().then(function(tag) { self.specTag = tag; });
        
        self.buildSet = ko.observable();

        self.buildHotkeyModel = new BuildHotkeyModel();

        self.showBuildBar = ko.computed(function() {
            return self.buildSet() && !self.buildSet().empty();
        });
        
        self.activeBuildGroup = ko.observable('');
        self.activeBuildGroupLocked = ko.observable(false);

        self.activeTab = ko.computed(function() {
            if (!self.activeBuildGroup() || !self.buildSet())
                return;
            return self.buildSet().tabsByGroup()[self.activeBuildGroup()];
        });
        self.activeBuildList = ko.computed(function() {
            var tab = self.activeTab();
            return tab && tab.items();
        });
        ko.computed(function() {
            if (!self.buildSet())
                return;
            var activeTab = self.activeTab();
            _.forEach(self.buildSet().tabs(), function(tab) {
                tab.active(tab === activeTab);
            });
        });

        self.activeBuildId = ko.observable();
        ko.computed(function() {
            if (!self.buildSet())
                return;
            var activeId = self.activeBuildId();
            _.forEach(self.buildSet().buildItems(), function(item) {
                item.active(item.id === activeId);
            });
        });
        
        self.executeStartBuild = function (event, item) {
            api.Panel.message(api.Panel.parentId, "build_bar.build", {
                item: item.id,
                batch: event.shiftKey,
                cancel: event.button === 2,
                urgent: event.ctrlKey,
                more: item.count > 0
            });
        };
        
        self.selectBuildGroup = function(group) {
            api.Panel.message(api.Panel.parentId, "build_bar.select_group", group);
        };
        
        self.setBuildHover = function(id) {
            api.Panel.message(api.Panel.parentId, 'build_bar.set_hover', id);
        };
        self.clearBuildHover = function(id) {
            self.setBuildHover('');
        };
        
        self.clearBuildSequence = function () {
            self.activeBuildGroup(null);
            self.activeBuildGroupLocked(false);
        };
        
        self.startBuildSequence = function(params) {
            var group = params.group;
            var locked = params.locked;
            
            var tab = self.buildSet().tabsByGroup()[group];
            if (!tab.visible())
                return;
            
            self.activeBuildGroup(group);
            if (locked)
                self.activeBuildGroupLocked(locked);
        };
        
        self.buildItem = function (index) {
            var list = self.activeBuildList();
            var item = list && list[index];
            if (!item || !item.id || !item.filled())
                return;

            self.activeBuildGroupLocked(true);

            return item.id;
        };
        
        self.parseSelection = function(payload) {
            var buildSet = self.buildSet();
                    
            buildSet.parseSelection(payload, self.buildLists);

            if (!buildSet.hasTab(self.activeBuildGroup())) {
                self.activeBuildGroup(null);
                self.clearBuildSequence();
            }

            api.Panel.onBodyResize();
            _.delay(api.Panel.onBodyResize);
        };
        
        self.hotkeys = ko.observable({});
        
        self.computeHotkeys = function() {
            var result = {};
            
            _.forIn(input_maps.build.keymap, function(name, hotkey) {
                result['item_' + /build_item_(.*)/.exec(name).pop()] = hotkey;
            });
            
            _.forEach(['build structure', 'build unit'], function (group) {
                _.forIn(input_maps[group].keymap, function (name, hotkey) {
                    if (name.endsWith('_structure'))
                        name = name.replace('_structure', '');
                    if (name.endsWith('_unit'))
                        name = name.replace('_unit', '');
                    result['tab_' + /start_build_(.*)/.exec(name).pop()] = hotkey;
                });
            });
            self.hotkeys(result);
        };
        self.computeHotkeys();
        input_maps_reload.progress(self.computeHotkeys);
        
        ko.computed(function() {
            var buildSet = self.buildSet();
            if (!buildSet)
                return;
            var hotkeys = self.hotkeys();
            var activeTab = self.activeTab();

            // Get tab hotkeys
            _.forEach(buildSet.tabs(), function(tab) {
                tab.hotkey(hotkeys['tab_' + tab.group()] || '');
            });
            // Clear out all current build items
            _.forEach(buildSet.buildItems(), function(item) {
                item.hotkey('');
            });
            // Get the active tab build item hotkeys
            _.forEach(activeTab && activeTab.items(), function(item, index) {
                if (item) {
                    item.hotkey(hotkeys['item_' + (index + 1).toString()] || '');
                }
            });
        });
        
        self.unitSpecs.then(function(payload) {
            // Fix up cross-unit references
            function crossRef(units) {
                for (var id in units) {
                    var unit = units[id];
                    unit.id = id;
                    if (unit.build) {
                        for (var b = 0; b < unit.build.length; ++b) {
                            var ref = units[unit.build[b]];
                            if (!ref) {
                                ref = { id: unit.build[b] };
                                units[ref.id] = ref;
                            }
                            unit.build[b] = ref;
                        }
                    }
                    if (unit.projectiles) {
                        for (var p = 0; p < unit.projectiles.length; ++p) {
                            var ref = units[unit.projectiles[p]];
                            if (!ref) {
                                ref = { id: unit.projectiles[p] };
                                units[ref.id] = ref;
                            }
                            unit.projectiles[p] = ref;
                        }
                    }
                }
            }
            crossRef(payload);

            var misc_unit_count = 0;

            function getBaseFileName(unit) {
                var filenameMatch = /([^\/]*)\.json[^\/]*$/;
                return (filenameMatch.exec(unit.id) || [])[1];
            };
            function addBuildInfo(unit, id) {
                unit.buildIcon = 'img/build_bar/units/' + getBaseFileName(unit) + '.png'

                var strip = /.*\.json/.exec(id);
                if (strip)
                    id = strip.pop();
                var target = self.buildHotkeyModel.SpecIdToGridMap()[id];
                if (!target) {
                    target = ['misc', misc_unit_count];
                    misc_unit_count++;
                }

                unit.buildGroup = target[0];
                unit.buildIndex = target[1];
            };
            for (var id in payload) {
                addBuildInfo(payload[id], id);
            }

            function makeBuildLists(units) {
                var result = {};
                for (var id in units) {
                    var unit = units[id];
                    if (!unit.build && !unit.projectiles)
                        continue;

                    var rawList = [];

                    _.forEach(['build', 'projectiles'], function (element) {
                        if (unit[element]) {
                            for (var b = 0; b < unit[element].length; ++b) {
                                var target = unit[element][b];
                                if (typeof (target) === 'string')
                                    continue;

                                rawList.push(target);
                            }
                        }
                    });

                    var build = _.filter(rawList, function (element) {
                        return (element.buildGroup !== 'misc');
                    });
                    if (build.length)
                        result[id] = build;
                }
                return result;
            }

            var buildLists = makeBuildLists(payload);
            self.buildSet(new BuildSet({
                units: payload,
                buildLists: buildLists,
                grid: self.buildHotkeyModel.SpecIdToGridMap(),
                specTag: self.specTag
            }));
        });

        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function () { self.active(false); });


            /* prevent the build bar from scrolling. */
            function sqelch (e) {
                e.preventDefault(e);
            }

            if (window.addEventListener)
                window.addEventListener('DOMMouseScroll', sqelch, false);
            window.onmousewheel = document.onmousewheel = sqelch;
        };
    }
    model = new BuildBarViewModel();
    
    handlers.selection = function(payload) {
        $.when(
            model.unitSpecs,
            model.getSpecTag
        ).then(function() {
            model.parseSelection(payload);
        });
    };

    handlers.unit_specs = function (payload) {
        delete payload.message_type;
        model.unitSpecs.resolve(payload);
    };
    
    handlers.clear_build_sequence = model.clearBuildSequence;
    handlers.start_build_sequence = model.startBuildSequence;
    handlers.build_item = model.buildItem;
    handlers.active_build_id = model.activeBuildId;

    // inject per scene mods
    if (scene_mod_list['live_game_build_bar'])
        loadMods(scene_mod_list['live_game_build_bar']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
