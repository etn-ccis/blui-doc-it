import UIKit
import MaterialComponents.MaterialCollections

// pad check
public let isIPad = UIDevice.current.userInterfaceIdiom == .pad


extension UIColor {

    /// Creates new color with RGBA values from 0-255 for RGB and a from 0-1
    ///
    /// - Parameters:
    ///   - r: the red color
    ///   - g: the green color
    ///   - b: the blue color
    ///   - a: the alpha color
    public convenience init(r: CGFloat, g: CGFloat, b: CGFloat, a: CGFloat = 1) {
        self.init(red: r / 255, green: g / 255, blue: b / 255, alpha: a)
    }

    /// Get UIColor from hex string, e.g. "FF0000" -> red color
    ///
    /// - Parameter hexString: the hex string
    /// - Returns: the UIColor instance or nil
    public class func fromString(hexString: String) -> UIColor? {
        if hexString.count == 6 {
            let secondIndex = hexString.index(hexString.startIndex, offsetBy: 2)
            let thirdIndex = hexString.index(hexString.startIndex, offsetBy: 4)
            let redStr = hexString[hexString.startIndex..<secondIndex]
            let greenStr = hexString[secondIndex..<thirdIndex]
            let blueStr = hexString[thirdIndex..<hexString.endIndex]
            return UIColor(
                r: CGFloat(Int(redStr, radix: 16)!),
                g: CGFloat(Int(greenStr, radix: 16)!),
                b: CGFloat(Int(blueStr, radix: 16)!))
        }
        return nil
    }
}

public struct Colors {

    /// black (label) color
    public static let black = UIColor(r: 0, g: 27, b: 35)

    /// blue (tint) color
    public static let blue = UIColor(r: 0, g: 114, b: 192)

    /// dark blue (status bar) color
    public static let darkBlue = UIColor(r: 0, g: 73, b: 162)

    /// light blue (selected cell background) color
    public static let lightBlue = UIColor(r: 219, g: 239, b: 249)

    /// blue color on for dark theme (Snakbar button) color
    public static let blueOnDark = UIColor(r: 19, g: 200, b: 255)

    /// red (error) color
    public static let red = UIColor(r: 234, g: 57, b: 58)

    /// red (alarm) color
    public static let darkRed = UIColor(r: 214, g: 0, b: 0)

    /// gray (icon) color
    public static let gray = UIColor(r: 109, g: 127, b: 133)

    /// green (checkmark) color
    public static let green = UIColor(r: 0, g: 183, b: 0)

    /// light gray (selected cell background) color
    public static let lightGray = UIColor(r: 238, g: 240, b: 240)

    /// the text field placeholder color
    public static let textFieldPlaceholder = UIColor(r: 182, g: 189, b: 192)

    /// the text field normal color
    public static let textFieldNormal = UIColor(r: 156, g: 168, b: 171)
}



extension MDCTypography {

    /// Convert system font to one of the MDCTypography fonts. Font size
    ///
    /// - Parameters:
    ///   - font: the font to convert
    ///   - keepFontSize: true - will keep the font size, false - will use default
    /// - Returns: MDCTypography font or nil, if system font is not supported or it's not a system font
    class func fromSystemFont(_ font: UIFont, keepFontSize: Bool = true) -> UIFont? {
        var fontToApply: UIFont?
        if let style = font.fontDescriptor.fontAttributes[UIFontDescriptor.AttributeName.textStyle] as? UIFontTextStyle {
            switch style {
            case UIFontTextStyle.title1:
                fontToApply = MDCTypography.display2Font()
            case UIFontTextStyle.title2:
                fontToApply = MDCTypography.display1Font()
            case UIFontTextStyle.title3:
                fontToApply = MDCTypography.headlineFont()
            case UIFontTextStyle.headline:
                fontToApply = MDCTypography.titleFont()
            case UIFontTextStyle.subheadline:
                fontToApply = MDCTypography.subheadFont()
            case UIFontTextStyle.body:
                fontToApply = MDCTypography.body2Font()
            case UIFontTextStyle.callout:
                fontToApply = MDCTypography.body1Font()
            case UIFontTextStyle.footnote:
                fontToApply = MDCTypography.captionFont()
            default:
                fontToApply = MDCTypography.captionFont()
            }
        }
        if let fontToApply = fontToApply, keepFontSize {
            return UIFont(descriptor: fontToApply.fontDescriptor, size: font.pointSize)
        }
        return fontToApply
    }
}


