'RUN in Command window 
'cscript papastuff_diffuse.vbs
'DEPENDENCIES
'ImageMagick installed and in your path (should be default using win installer)
'Copy Planetary Annihilation Titans\bin_x64\tools\papatran.exe to local resolution dir
'PinkPixel adds a 1pixel ping rectangle to the png's in top right corner
'PapaTimeDiffuse converts all the diffuse_pixel.png's to papa's and places them in the corresponding folder in pa\units
'MAKE SURE pa\units and art\textures filenames and paths are the same!

Dim FSO, WSH, scriptdir, clientunitsdir
Set WSH = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
scriptdir = FSO.GetParentFolderName(WScript.ScriptFullName)
clientunitsdir= FSO.GetParentFolderName(FSO.GetParentFolderName(FSO.GetParentFolderName(scriptdir))) & "\client\pa\units"
wscript.echo "START PAPA STUFF"

PinkPixel FSO.GetFolder(scriptdir)

Sub PinkPixel(Folder)
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") AND NOT instr(file.name, "diffuse_pixel") Then
              wscript.echo "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 -alpha set -background none " & replace(file.path,".png","_pixel.png")
              'run ImageMagick to add 1 pink pixel to top-right and save as file_pixel.png
              WSH.Run "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 -alpha set -background none " & replace(file.path,".png","_pixel.png"), 0, true
              
              PapafiyDiffuse file, SubFolder.name & "\" & LCase(SubFolderType.Name)
            End If
          Next
          
          For Each SubSubFolder in SubFolderType.SubFolders
            wscript.Echo SubSubFolder.Name
            For Each file in SubSubFolder.Files
              If instr(file.name, "diffuse") AND NOT instr(file.name, "diffuse_pixel") Then
                wscript.echo "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 -alpha set -background none " & replace(file.path,".png","_pixel.png")
                'run ImageMagick to add 1 pink pixel to top-right and save as file_pixel.png
                WSH.Run "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 -alpha set -background none " & replace(file.path,".png","_pixel.png"), 0, true
                
                PapafiyDiffuse file, SubFolder.name & "\" & LCase(SubFolderType.Name) & "\" & LCase(SubSubFolder.Name)
              End If
            Next
          Next
        Next
    Next
End Sub

Sub PapafiyDiffuse(file, location)
    filepath = file.path
    filename = file.name
    tempfile = replace(filepath,".png","_temp.png")
    pixelfile = replace(filepath,".png","_pixel.png")
    FSO.MoveFile filepath, tempfile
    FSO.MoveFile pixelfile , filepath
    wscript.echo scriptdir & "\papatran.exe --texture-mode include -o " & replace(filename,".png",".papa") & " " & filepath
    'Run papatran in resolution folder with matching default.settings
    WSH.Run scriptdir & "\papatran.exe --texture-mode include -o " & replace(filename,".png",".papa") & " " & filepath, 0, true
    'Copy PAPA file to correct dir
    FSO.CopyFile scriptdir & "\" & replace(filename,".png",".papa"), clientunitsdir & "\" & location & "\" & LCase(replace(filename,".png",".papa")), true
    'Remove temp PAPA file
    FSO.DeleteFile scriptdir & "\" & replace(filename,".png",".papa")
    FSO.DeleteFile filepath
    'Remove _pixel file
    FSO.MoveFile tempfile , filepath
    
End Sub

