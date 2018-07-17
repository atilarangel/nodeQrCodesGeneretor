var fs = require("fs")
const QRCode = require("QRCode");
const file = require('./title.js')
const opts = {
    errorCorrectionLevel: 'H',
    type: 'svg',
    scale: 10,
    rendererOpts: {
        quality: 0.3
    }
}
const write = (filename, content, locales) =>{
    fs.writeFile(`./qrCodes/${locales}/${filename}.svg`, content,
        function(err) {
            if (err) {
            return console.log(err);
            }
            console.log("Gerado", filename)
        }
    );
}

const qrCode = (locales,url,elm) => {
    console.log(url)

    return QRCode.toString(
        url,
        opts,
        (err, string) => {
            if (err) throw err;
            return write(elm.title, string, locales)

        })

}

file["Twitter"].forEach(elm => qrCode('Twitter', `twitter.com/${elm.id}`, elm))
file["Instagram"].forEach(elm => qrCode('Instagram', `www.instagram.com/${elm.id}`,elm))
write()