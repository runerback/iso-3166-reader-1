export const ContinentPattern = /\<a\s+href\=\"(?<link>.+\-codes\.php)\".*?\<font.*?\>(?<name>.+)\<\/font\>\<\/a\>/;
export const CountryPattern = /\<tr\s+bgcolor\=\"#F9EFD6.*?\<td.*?\<font.*?\<a\s+href\=\"?(?<link>\/country\.php\?.*?)\"?\>(?<name>.*?)\s*\<\/a\>.*?\<\/td.*?\<td.*?\<font.*?\"\>(?<code2>.{2})\s*\<\/font.*?\<\/td.*?\<td.*?\<font.*?\"\>(?<code3>.{3})\s*\<\/font.*?\<\/td.*?\<td.*?\<font.*?\"\>\..*?<\/font.*?\<\/td.*?\<\/tr\>/;
export const CountryDetailPattern = /<img\s+onmouseover.*?src\=\"(?<flag>\/graphics\/flags\/small\/.+?\.png)\".*?\>.*?\<div\s+id\=\"info\".*?\<font.*?\<b.*?\<font\s+color\=\"#FF0000\"\>(?<name>.+?)\s*\<\/b\>\<\/font.*?\"?.*?country\s+code\s+is\s+(?<code>.+?)\"?.*?\<font.*?\<\/font.*?\<\/font.*?\<\/div\>/;