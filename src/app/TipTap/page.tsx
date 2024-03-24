'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './ToolBar/page'
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import Underline from "@tiptap/extension-underline";
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import py from 'highlight.js/lib/languages/python'


lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('py', py)

const Tiptap = ({ content, onChange }: any) => {

    const handleChange1 = (newContent: string) => {
        onChange(newContent)
    }
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2],
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "bullet_class",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "order_class",
                    },
                },
                heading: {
                    HTMLAttributes: {
                        class: `font-size: inherit font-weight: inherit`,
                    },
                },
            }),
            Image,
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc pl-13'
                }
            }),
            ListItem,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal pl-13'
                }
            })
        ],
        content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `,
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-6 py-3 justify-start border-b border-r text-black border-l border-gray-700  items-start w-full gap-3 pt-4 rounded-bl-md rounded-br-md outline-none"
            }
        },
        onUpdate: ({ editor }) => {
            handleChange1(editor.getHTML());
        },
    })

    return (
        <>
            <div className='w-full px-4'>
                <Toolbar editor={editor} content={content}></Toolbar>
                <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
            </div>

        </>

    )
}

export default Tiptap