[README.md](https://github.com/user-attachments/files/34973037/README.md)
# OCR OKUMA – Masaüstü uygulama projesi

Bu proje, sağlanan HTML uygulamasını Electron masaüstü penceresinde çalıştırır.
Mevcut OCR ve PDF işlevleri korunmuştur.

## Online çalışma

HTML, Tesseract.js, PDF.js, pdf-lib, fontkit ve JSZip kütüphanelerini CDN üzerinden
yükler. PDF.js worker ve Noto Sans yazı tipi de internetten alınır. OCR dil verileri
Tesseract.js tarafından ihtiyaç duyuldukça indirilebilir. Dolayısıyla internet
bağlantısı gerekir.

## Mac üzerinde geliştirme ve Mac uygulaması oluşturma

Mac'te Node.js LTS kurduktan sonra proje klasöründe:

```bash
npm install
npm start
npm run build:mac
```

macOS paketleri `dist` klasörüne yazılır. DMG/ZIP içindeki uygulama imzalanmamışsa
macOS güvenlik uyarısı verebilir. Geniş dağıtım için Apple Developer ID imzalama
ve notarizasyon gerekir.

## Windows Portable EXE oluşturma

Windows bilgisayarda proje klasöründe:

```bash
npm install
npm run build:win
```

Portable EXE `dist` klasörüne yazılır. Kullanıcının ayrıca Node.js kurması gerekmez.

## Mac kullanırken hem Windows hem Mac sürümünü üretme

Projede `.github/workflows/build.yml` hazırdır. Projeyi bir GitHub deposuna yükleyin.
GitHub deposunda Actions sekmesinden **OCR OKUMA - Windows ve macOS paketleri**
iş akışını `Run workflow` ile başlatın. GitHub, Windows ve macOS derlemelerini
kendi uygun makinelerinde ayrı ayrı yapar. İşlem bitince Actions çalışmasının
Artifacts bölümünden `OCR-OKUMA-windows-portable` ve `OCR-OKUMA-macos-app`
dosyalarını indirebilirsiniz.

Alternatif olarak `v1.0.0` gibi bir etiket gönderildiğinde de iş akışı otomatik
çalışır.

## Önemli paketleme notları

- Windows EXE ve macOS APP aynı kaynak koddan, ayrı işletim sistemi ortamlarında üretilir.
- Bu ZIP kaynak proje/derleme ayarlarıdır; hazır EXE veya imzalı APP değildir.
- İnternet üzerinden yüklenen CDN kaynakları ve OCR dil verileri ilk kullanımda
  internet bağlantısı gerektirir.
