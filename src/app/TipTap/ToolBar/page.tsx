"use client"

import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    Link,
    Images,
} from "lucide-react";


import Image from 'next/image';

type Props = {
    editor: Editor | null;
    content: string;
}

export default function Toolbar({ editor, content }: Props) {


    const [image, setImage] = useState(null);




    if (!editor) {
        return null
    }
    console.log(editor)

    // const setLink = useCallback(() => {
    //     const previousUrl = editor.getAttributes('link').href
    //     const url = window.prompt('URL', previousUrl)

    //     // cancelled
    //     if (url === null) {
    //         return
    //     }

    //     // empty
    //     if (url === '') {
    //         editor.chain().focus().extendMarkRange('link').unsetLink()
    //             .run()

    //         return
    //     }

    //     // update link
    //     editor.chain().focus().extendMarkRange('link').setLink({ href: url })
    //         .run()
    // }, [editor])



    return (
        <>
        <div className="relative">
            <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700">
                <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                    <button
                        onClick={(e: any) => {
                            e.preventDefault()
                            editor.chain().focus().toggleBold().run()
                        }}
                        className={
                            editor.isActive("bold")
                                ? "bg-slate-500 text-white p-2 rounded-lg"
                                : "text-bold"
                        }

                    >
                        <Bold className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e: any) => {
                            e.preventDefault()
                            // const typeimp = window.getSelection()?.toString().trim()
                            // console.log(typeimp)
                            editor.chain().focus().toggleHeading( {
                                level: 1
                            }).run()
                        }}
                        className={
                            editor.isActive("heading", { level: 1 })
                                ? "bg-slate-500 text-white p-2 text-3xl rounded-lg"
                                : "text-bold text-3xl"
                        }
                        style={{ fontSize: 'x-large' }}

                    >
                        
                        <Heading1 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e: any) => {
                            e.preventDefault()
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }}
                        className={
                            editor.isActive("heading", { level: 2 })
                                ? "bg-slate-500 text-white p-2 rounded-lg"
                                : "text-bold"
                        }

                    >
                        <Heading2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleItalic().run();
                        }}
                        className={
                            editor.isActive("italic")
                                ? "bg-slate-500 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Italic className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleUnderline().run();
                        }}
                        className={
                            editor.isActive("underline")
                                ? "bg-slate-500 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Underline className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleStrike().run();
                        }}
                        className={
                            editor.isActive("strike")
                                ? "bg-slate-500 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Strikethrough className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            console.log("bulletlist")
                            e.preventDefault();
                            editor.chain().focus().toggleBulletList().run();
                        }}
                        className={
                            editor.isActive("bulletList")
                                ? "bg-slate-400  p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            console.log("order list dummt")
                            e.preventDefault();
                            editor.chain().focus().toggleOrderedList().run();
                        }}
                        className={
                            editor.isActive("orderedList")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <ListOrdered className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {

                            e.preventDefault();
                            editor.chain().focus().toggleBlockquote().run();
                        }}
                        className={
                            editor.isActive("blockquote")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Quote className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const url1 = window.getSelection()?.toString().trim();
                            // const typeimp = window.getSelection()?.toString().trim()
                            // console.log(typeimp)

                            if (url1) {
                                editor.chain().focus().extendMarkRange('link').setLink({ href: url1, target: '_blank' }).run();
                            }
                        }}
                        className={
                            editor.isActive('link')
                                ? 'bg-slate-400 text-white p-2 rounded-lg'
                                : 'text-bold'
                        }
                    >
                        <Link className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (event : any) => {
                                const file = event.target.files[0];
                                if (file) {
                                    const reader  = new FileReader();
                                    reader.onload = (readerEvent : any) => {
                                        const imageUrl = readerEvent.target.result;
                                        editor.chain().focus().setImage({ src: imageUrl }).run();
                                    };
                                    reader.readAsDataURL(file);
                                }
                            };
                            input.click();
                        }}
                        className={
                            editor.isActive("image")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Images className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleCodeBlock().run();
                        }}
                        className={
                            editor.isActive("codeBlock")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold"
                        }
                    >
                        <Code className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().undo().run();
                        }}
                        className={
                            editor.isActive("undo")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold hover:bg-slate-400 hover:text-white p-1 hover:rounded-lg"
                        }
                    >
                        <Undo className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().redo().run();
                        }}
                        className={
                            editor.isActive("redo")
                                ? "bg-slate-400 text-white p-2 rounded-lg"
                                : "text-bold hover:bg-slate-400 hover:text-white p-1 hover:rounded-lg"
                        }
                    >
                        <Redo className="w-5 h-5" />
                    </button>

                </div>

            </div>
            </div>
        </>
    )
}