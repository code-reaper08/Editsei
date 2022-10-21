import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: false,
  smartypants: true,
});

export default function Main() {
  const [textcontent, setTextcontent] = useState("# Hello");
  const [parsedcontent, setParsedcontent] = useState("<h1>Hello</h1>");
  const [savedinfo, setSavedinfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState();
  let fileReader;

  const onChange = (e) => {
    let file = e.target.files;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file[0]);
  };

  const cleanContent = (string) => {
    string = string.replace(/^\s*[\r\n]/gm, "");
    let array = string.split(new RegExp(/[\r\n]/gm));
    console.log(array);
    array.splice(0, 3);
    array.splice(-3);
    return array.join("\n");
  };

  const handleFileRead = (e) => {
    let content = fileReader.result;
    // let text = deleteLines(content, 3);
    content = cleanContent(content);
    // … do something with the 'content' …
    setText(content);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let Def_Bundle = {
        md_raw: "# Hello",
        clean_html: "<h1>Hello</h1>",
      };
      let Bundle = JSON.parse(window.localStorage.getItem("latest-content"));
      if (Bundle != null) {
        setTextcontent(Bundle.md_raw ? Bundle.md_raw : "# Hello");
        setParsedcontent(Bundle.clean_html ? Bundle.clean_html : "Hello");
      } else {
        window.localStorage.setItem(
          "latest-content",
          JSON.stringify(Def_Bundle)
        );
      }
    }
  }, []);

  function copier() {
    let copytext = document.getElementById("main-editor");
    copytext.select();
    copytext.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copytext.value);
    setCopied(true);
  }

  function downloader() {
    if (typeof window !== "undefined") {
      console.log("download initiated");
      const element = document.createElement("a");
      const file = new Blob([document.getElementById("main-editor").value], {
        type: "text/plain;charset=utf-8",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Editsei.md";
      document.body.appendChild(element);
      element.click();
    }
  }

  function saveContent() {
    const ContentBundle = {
      md_raw: textcontent,
      clean_html: parsedcontent,
    };
    window.localStorage.setItem(
      "latest-content",
      JSON.stringify(ContentBundle)
    );
    setSavedinfo(true);
  }

  function sanitizer(XSSpronehtml) {
    let cleanHTML = DOMPurify.sanitize(XSSpronehtml);
    setParsedcontent(cleanHTML);
    saveContent(cleanHTML);
    saveContent();
  }

  function parser(inpcontent) {
    const html = marked.parse(inpcontent);
    sanitizer(html);
  }

  const handleTextChange = (e) => {
    let content = e.target.value;
    setTextcontent(content);
    parser(content);
  };
  return (
    <div className="main_wrapper md:flex md:flex-row md:justify-between mt-10 flex flex-col justify-center items-center">
      <div className="Editor md:w-1/2 md:mb-0 h-[70vh] md:mr-5 w-full mb-28">
        <span className="bg-black text-white font-mono p-2 text-right rounded-t-md text-xl">
          Editor {savedinfo ? "" : "●"}
        </span>
        <textarea
          cols="30"
          rows="15"
          onChange={handleTextChange}
          value={text}
          className=" scroll-smooth resize-none w-full h-full font-mono text-xl border-2 rounded-t-md border-black p-3 outline-none bg-black text-yellow-200"
          name="main-editor"
          id="main-editor"
          placeholder="Type some Markdown to preview"
        ></textarea>
        <div className="text-yellow-200 bg-gray-900 p-3 flex flex-row justify-between">
          {savedinfo ? (
            <div>✔</div>
          ) : (
            <div className="flex flex-row items-center justify-between font-mono">
              <div className=" animate-spin mr-2">⨁</div>
              <div className="animate-pulse">saving...</div>
            </div>
          )}
          <div className="flex flex-row">
            <div className="mr-5">
              <button
                className="hover:bg-yellow-200 hover:text-black p-1 transition-all rounded-md"
                onClick={downloader}
              >
                Download
              </button>
            </div>
            <div className="mr-5">
              <input
                className="hover:bg-yellow-200 hover:text-black p-1 transition-all rounded-md"
                type="file"
                name="myfile"
                onChange={onChange}
              />
              {/* <button className="hover:bg-yellow-200 hover:text-black p-1 transition-all rounded-md">
                Upload
              </button> */}
            </div>
            <div>
              <button
                onClick={copier}
                className="hover:bg-yellow-200 hover:text-black p-1 transition-all rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="previewer md:w-1/2 w-full h-[70vh]">
        <span className="bg-yellow-200 font-mono p-2 text-right rounded-t-md text-xl">
          Preview tab
        </span>
        <div
          className="prose max-w-none overflow-auto break-words scroll-smooth  w-full h-full font-mono rounded-md p-3 outline-none bg-yellow-200"
          placeholder="Hello"
          name="preview-window"
          id="preview-window"
          dangerouslySetInnerHTML={{ __html: parsedcontent }}
        ></div>
      </div>
    </div>
  );
}
