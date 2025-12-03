import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface WorkshopAgenda {
  content: string;
  rawContent: string;
}

const markdownToHtml = (markdown: string): string => {
  const lines = markdown.split('\n');
  const result: string[] = [];
  let listStack: Array<{ type: 'ul' | 'ol', indent: number }> = [];
  let inParagraph = false;
  
  const closeAllLists = () => {
    while (listStack.length > 0) {
      const list = listStack.pop();
      result.push(`</${list!.type}>`);
    }
  };
  
  const getIndentLevel = (line: string): number => {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  };
  
  const processInlineFormatting = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
  };
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip empty lines
    if (line.trim() === '') {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      closeAllLists();
      continue;
    }
    
    const trimmed = line.trim();
    const indent = getIndentLevel(line);
    
    // Headers
    if (trimmed.startsWith('### ')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      closeAllLists();
      result.push(`<h3>${trimmed.substring(4)}</h3>`);
      continue;
    }
    
    if (trimmed.startsWith('## ')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      closeAllLists();
      result.push(`<h2>${trimmed.substring(3)}</h2>`);
      continue;
    }
    
    if (trimmed.startsWith('# ')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      closeAllLists();
      result.push(`<h1>${trimmed.substring(2)}</h1>`);
      continue;
    }
    
    // Ordered lists (numbered)
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      
      // Close lists that are deeper or different type at same level
      while (listStack.length > 0) {
        const top = listStack[listStack.length - 1];
        if (top.indent > indent || (top.indent === indent && top.type !== 'ol')) {
          listStack.pop();
          result.push(`</${top.type}>`);
        } else {
          break;
        }
      }
      
      // Open new list if needed (only if no matching list exists)
      const needsNewList = listStack.length === 0 || 
                          listStack[listStack.length - 1].indent < indent ||
                          listStack[listStack.length - 1].type !== 'ol';
      
      if (needsNewList) {
        result.push('<ol>');
        listStack.push({ type: 'ol', indent });
      }
      
      const content = processInlineFormatting(orderedMatch[2]);
      result.push(`<li>${content}</li>`);
      continue;
    }
    
    // Unordered lists
    const unorderedMatch = trimmed.match(/^[\*\-]\s+(.*)$/);
    if (unorderedMatch) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      
      // Close lists that are deeper or different type at same level
      while (listStack.length > 0) {
        const top = listStack[listStack.length - 1];
        if (top.indent > indent || (top.indent === indent && top.type !== 'ul')) {
          listStack.pop();
          result.push(`</${top.type}>`);
        } else {
          break;
        }
      }
      
      // Open new list if needed (only if no matching list exists)
      const needsNewList = listStack.length === 0 || 
                          listStack[listStack.length - 1].indent < indent ||
                          listStack[listStack.length - 1].type !== 'ul';
      
      if (needsNewList) {
        result.push('<ul>');
        listStack.push({ type: 'ul', indent });
      }
      
      const content = processInlineFormatting(unorderedMatch[1]);
      result.push(`<li>${content}</li>`);
      continue;
    }
    
    // Regular text (paragraphs)
    closeAllLists();
    
    const processedLine = processInlineFormatting(line);
    
    if (!inParagraph) {
      result.push('<p>');
      inParagraph = true;
    } else {
      result.push('<br>');
    }
    result.push(processedLine);
  }
  
  // Close any open tags
  if (inParagraph) {
    result.push('</p>');
  }
  closeAllLists();
  
  return result.join('\n');
};

export const getWorkshopAgenda = (slug: string, locale: string = 'pl'): WorkshopAgenda | null => {
  try {
    const filePath = join(process.cwd(), 'src', 'data', 'workshops', slug, locale, 'agenda.md');
    
    if (!existsSync(filePath)) {
      console.warn(`Agenda file not found: ${filePath}`);
      return null;
    }

    const rawContent = readFileSync(filePath, 'utf8');
    const content = markdownToHtml(rawContent);

    return {
      content,
      rawContent,
    };
  } catch (error) {
    console.error(`Error reading agenda file for ${slug}/${locale}:`, error);
    return null;
  }
};
