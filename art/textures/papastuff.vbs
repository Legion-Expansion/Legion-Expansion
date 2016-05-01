'RUN in Command window 
'cscript papastuff.vbs
'DEPENDENCIES
'ImageMagick installed and in your path (should be default using win installer)
'Planetary Annihilation Titans\bin_x64\tools\ in your path
'copy default.settings from media\pa to local folder
'PinkPixel adds a 5pixel ping rectangle to the png's in top right corner
'PapaTime converts all the png's to papa's and places them in the corresponding folder in pa\units
'MAKE SURE pa\units and art\textures filenames and paths are the same!

Dim FSO, WSH, scriptdir, clientunitsdir
Set WSH = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
scriptdir = FSO.GetParentFolderName(WScript.ScriptFullName)
clientunitsdir= FSO.GetParentFolderName(FSO.GetParentFolderName(scriptdir)) & "\pa\units"
wscript.echo "START PAPA STUFF"

'UNCOMMENT LINES AS YOU NEED THEM

'PinkPixel FSO.GetFolder(scriptdir)
'PapaTime FSO.GetFolder(scriptdir)


Sub PinkPixel(Folder)
    'For Each folder, create another For Each instance
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") Then
              wscript.echo "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 5,5"" -rotate 90 " & file.path
              WSH.Run "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 5,5"" -rotate 90 " & file.path, 0, true
            End If
          Next
        Next
    Next
End Sub

Sub PapaTime(Folder)
    'For Each folder, create another For Each instance
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For Each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") Then
              'create papa in textures
              'wscript.echo "papatran.exe --texture-mode include -o " & scriptdir & "\" & replace(file.name,".png",".papa") & " " & file.path
              'WSH.Run "papatran.exe --texture-mode include -o " & scriptdir & "\" & replace(file.name,".png",".papa") & " " & file.path, 0, true
              'create papa in correct place
              wscript.echo "papatran.exe --texture-mode include -o " & clientunitsdir & "\" & SubFolderType.Name & "\" & replace(file.name,".png",".papa") & " " & file.path
              WSH.Run "papatran.exe --texture-mode include -o " & clientunitsdir & "\" & SubFolderType.Name & "\" & replace(file.name,".png",".papa") & " " & file.path, 0, true
            End If
          Next
        Next
    Next
End Sub