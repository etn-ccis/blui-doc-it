# Internationalization

Internationalization is a useful practice for adapting applications to various regions, languages, and cultures. This can be accomplished by considering differences in language scripts and directionality. 

## Language Support
To localize app content, create a string resource file or object containing any relevant translations of display content. Refer to the appropriate file/object constants within your application depending on the user selected language.  

Different writing systems may require different vertical and horizontal space than English. To ensure flexibility, avoid using fixed dimensions for necessary UI components such as buttons, labels, and badges. Also consider setting different default display font sizes for languages that may have smaller glyphs. 

>**NOTE:** The recommended PX Blue font for all non Latin script languages is [Noto Sans](https://www.google.com/get/noto/#sans-lgc).

## Bidirectionally / RTL Support 
Applications using right-to-left languages should mirror all display content. For example, navigation drawers should be displayed on the right side of the screen, icon buttons should display to the right of text, and any icons with directionality should be mirrored. 

{{ angular stackblitz= }}

{{ react stackblitz= }}


