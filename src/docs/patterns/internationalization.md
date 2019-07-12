# Internationalization

Internationalization is the practice of adapting applications to various regions, languages, and cultures. You can accomplish this in your applications by considering the differences in language, scripts, and directionality. 

## Language Support
To localize your application content, you should create a string resource file or object that contains the translations for any display text used in your application. You will not want to have any text hard-coded in your application's UI. To switch your application to another language, you simply toggle the file/object used to populate the UI to the appropriate translation.  

Different languages/writing systems may require different vertical and horizontal space. To ensure flexibility, avoid using fixed dimensions for necessary UI components such as buttons, labels, and badges. Also consider setting different default display font sizes for languages that may have smaller glyphs. 

>**NOTE:** PX Blue recommends using [Noto Sans](https://www.google.com/get/noto/#sans-lgc) for all non-western languages. You can read more on our [Typography](/style/typography) page.

### Showing Language Options
When showing a list of languages, you can decide whether you want to translate the language names or not (e.g., "English" vs. "Inglés"). There are pros and cons to each approach, so consider what makes the most sense for your application. Providing other cues (such as an icon) to help users find the language selection can help.

## Bi-directionality/ Right-to-Left (RTL) Support 
Some languages, such as Arabic and Hebrew, are read from right to left. Applications supporting these languages will need to mirror the UI so the natural flow is from right to left. For example, navigation drawers should be displayed on the right side of the screen, icons should be to the right of text in buttons, and any icons with directionality should be mirrored. 

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-internationalization-angular?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-internationalization-react?embed=1&file=index.js&hideNavigation=1&view=preview }}


