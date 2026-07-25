import AppKit

let inputPath = "/Users/mac/.gemini/antigravity/brain/c48a9dc9-81f9-4fb6-9447-bb82c7f45610/.user_uploaded/media__1784901520785.png"
let outputPath = "/Users/mac/portfolio/public/avatar.png"

guard let image = NSImage(contentsOfFile: inputPath),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let width = CGFloat(cgImage.width)
let height = CGFloat(cgImage.height)

let cropWidth = width * 0.16
let cropHeight = cropWidth
let cropX = (width - cropWidth) / 2.0
let cropY = (height - cropHeight) / 2.0 + (height * 0.04)

let cropRect = CGRect(x: cropX, y: cropY, width: cropWidth, height: cropHeight)

guard let cropped = cgImage.cropping(to: cropRect) else {
    print("Failed to crop")
    exit(1)
}

let rep = NSBitmapImageRep(cgImage: cropped)
if let pngData = rep.representation(using: .png, properties: [:]) {
    try? pngData.write(to: URL(fileURLWithPath: outputPath))
    print("SUCCESS_SAVED_AVATAR")
}
