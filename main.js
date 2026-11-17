const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1240,
    height: 850,
    minWidth: 900,
    minHeight: 650,
    title: "OCR OKUMA",
    backgroundColor: "#f3f4f6",
    autoHideMenuBar: false,
    webPreferences: {
      // Renderer is kept isolated from Node.js for safer execution.
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, "app", "index.html"));

  // Keep navigation inside the app; open any external page in the user's browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    const localFile = path.join(__dirname, "app", "index.html");
    if (url !== `file://${localFile}` && !url.startsWith("file://")) {
      event.preventDefault();
      if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  const template = [
    {
      label: "Dosya",
      submenu: [
        { label: "Uygulamayı yeniden yükle", click: () => BrowserWindow.getFocusedWindow()?.reload() },
        { type: "separator" },
        { role: "quit", label: "Çıkış" }
      ]
    },
    { label: "Düzen", submenu: [{ role: "copy" }, { role: "paste" }, { role: "selectAll" }] },
    { label: "Görünüm", submenu: [{ role: "reload" }, { role: "togglefullscreen" }, { role: "zoomIn" }, { role: "zoomOut" }, { role: "resetZoom" }] },
    { label: "Yardım", submenu: [
      { label: "OCR OKUMA hakkında", click: () => dialog.showMessageBox({ message: "OCR OKUMA", detail: "Görsel/PDF metin tanıma ve PDF araçları.", buttons: ["Tamam"] }) }
    ]}
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
