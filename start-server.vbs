Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "E:\Programme\TaskTracker"
WshShell.Run "node server.js", 0, False
