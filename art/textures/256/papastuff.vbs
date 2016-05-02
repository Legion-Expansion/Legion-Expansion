'RUN in Command window 
'cscript papastuff.vbs
'DEPENDENCIES
'ImageMagick installed and in your path (should be default using win installer)
'Copy Planetary Annihilation Titans\bin_x64\tools\papatran.exe to local resolution dir
'PinkPixel adds a 1pixel ping rectangle to the png's in top right corner
'PapaTimeDiffuse converts all the diffuse_pixel.png's to papa's and places them in the corresponding folder in pa\units
'PapaTimeNoDiffuse converst all non diffuse textures to papa's
'MAKE SURE pa\units and art\textures filenames and paths are the same!

Dim FSO, WSH, scriptdir, clientunitsdir
Set WSH = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
scriptdir = FSO.GetParentFolderName(WScript.ScriptFullName)
clientunitsdir= FSO.GetParentFolderName(FSO.GetParentFolderName(FSO.GetParentFolderName(scriptdir))) & "\client\pa\units"
wscript.echo "START PAPA STUFF"

PinkPixel FSO.GetFolder(scriptdir)
PapaTimeDiffuse FSO.GetFolder(scriptdir)
PapaTimeNoDiffuse FSO.GetFolder(scriptdir)

Sub PinkPixel(Folder)
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") AND NOT instr(file.name, "diffuse_pixel") Then
              wscript.echo "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 " & replace(file.path,".png","_pixel.png")
              'run ImageMagick to add 1 pink pixel to top-right and save as file_pixel.png
              WSH.Run "magick " & file.path & " -rotate -90 -fill magenta -draw ""rectangle 0,0 1,1"" -rotate 90 " & replace(file.path,".png","_pixel.png"), 0, true
            End If
          Next
        Next
    Next
End Sub

Sub PapaTimeDiffuse(Folder)
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For Each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") AND instr(file.name, "_pixel") Then
              wscript.echo scriptdir & "\papatran.exe --texture-mode include -o " & replace(file.name,".png",".papa") & " " & file.path
              'Run papatran in resolution folder with matching default.settings
              WSH.Run scriptdir & "\papatran.exe --texture-mode include -o " & replace(file.name,".png",".papa") & " " & file.path, 0, true
              'Copy PAPA file to correct dir
              FSO.CopyFile scriptdir & "\" & replace(file.name,".png",".papa"), clientunitsdir & "\" & SubFolder.Name & "\" & LCase(SubFolderType.Name) & "\" & LCase(replace(file.name,"_pixel.png",".papa")), true
              'Remove temp PAPA file
              FSO.DeleteFile scriptdir & "\" & replace(file.name,".png",".papa")
              'Remove _pixel file
              FSO.DeleteFile file.path 
            End If
          Next
        Next
    Next
End Sub

Sub PapaTimeNoDiffuse(Folder)
    For Each Subfolder in Folder.SubFolders
        wscript.Echo subfolder.Name
        For Each SubFolderType in SubFolder.SubFolders
          wscript.Echo subfolderType.Name
          For Each file in SubfolderType.Files
            If instr(file.name, "diffuse") Then
              'Already done....
            Else
              wscript.echo scriptdir & "\papatran.exe --texture-mode include -o " & replace(file.name,".png",".papa") & " " & file.path
              'Run papatran in resolution folder with matching default.settings
              WSH.Run scriptdir & "\papatran.exe --texture-mode include -o " & replace(file.name,".png",".papa") & " " & file.path, 0, true
              'Copy PAPA file to correct dir
              FSO.CopyFile scriptdir & "\" & replace(file.name,".png",".papa"), clientunitsdir & "\" & SubFolder.Name & "\" & LCase(SubFolderType.Name) & "\" & LCase(replace(file.name,".png",".papa")), true
              'Remove temp PAPA file
              FSO.DeleteFile scriptdir & "\" & replace(file.name,".png",".papa")
            End If
          Next
        Next
    Next
End Sub