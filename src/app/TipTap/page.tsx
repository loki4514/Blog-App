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
import CodeBlock from '@tiptap/extension-code-block'
import { lowlight } from 'lowlight'
import Blockquote from '@tiptap/extension-blockquote'
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
            CodeBlock.configure({
                languageClassPrefix: 'language-js',
                HTMLAttributes: {
                    class: 'bg-slate-500',
                },
            }),
            Text,
            Heading.configure({
                levels: [1, 2],
            }),
            CodeBlockLowlight.configure({

                lowlight
            }),
            StarterKit.configure({
                codeBlock: false,
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
                        class: ``,
                    },
                },
            }),
            Image.configure({
                inline: true,
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc pl-13'
                }
            }),
            ListItem,
            Underline,
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'p-4 my-4 border-s-4 border-slate-300 bg-gray-50',
                },
            }),
            Link.extend({
                inclusive: false
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: 'underline',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal pl-13'
                }
            })
        ],
        content: `
        
      `,
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-6 py-3 justify-start  border-b border-r text-black border-l border-gray-700  items-start w-full gap-3 pt-4 rounded-bl-md rounded-br-md outline-none"
            }
        },
        onUpdate: ({ editor }) => {
            handleChange1(editor.getHTML());
        },
    })

    return (
        <>
            <div className='w-full px-4'>
                <div className='sticky top-0 z-10 bg-gray-50'>
                    <Toolbar editor={editor} content={content}></Toolbar>
                </div>
                <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
            </div>

        </>

    )
}

export default Tiptap