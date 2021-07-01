mod utils;

#[macro_use]
extern crate lazy_static;

use wasm_bindgen::prelude::*;
use regex::Regex;
use js_sys::Array;
// use wasm_bindgen::JsCast;
// use web_sys::{Document, Element, HtmlElement, Window};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Use a JsString here and not a Rust String so we don't do an unnecessary copy. This lets use use
// the string that has already been allocated in JS-land and speed things up.
// https://charlycst.github.io/posts/speeding-up-pattern-matching/
#[wasm_bindgen]
pub fn process_file(file_content: &str) -> Array {
    log("This is from Rust!");

    lazy_static! {
        static ref REGEX: Regex = Regex::new(r"^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9:]{8} \([\-0-9]{4,8}\))](\[[\-0-9]{4,5}])\[([a-zA-Z0-9]{4,6})]\[TID ([a-zA-Z0-9]{1,8})]\[([a-zA-Z0-9.:]*)]\[([a-zA-Z0-9.:$<>]*)](.*)$").unwrap();
    }

    let lines = file_content.split("\n");

    let parsed_logs = Array::new();

    for line in lines {
        match REGEX.captures(line) {
            Some(captures) => {
                let mut vec = Array::new_with_length(captures.len() as u32);

                for i in 0..captures.len() {
                    vec.push(&JsValue::from(&captures[i]));
                }

                parsed_logs.push(&vec);

                // parsed_logs.push(vec);
            }
            None => {
                // log("Did not capture");
            }
        }
    }

    return parsed_logs;
}

// #[wasm_bindgen]
// pub fn process_file(file_input : web_sys::HtmlInputElement) {
//     //Check the file list from the input
//     let filelist = file_input.files().expect("Failed to get filelist from File Input!");
//     //Do not allow blank inputs
//     if filelist.length() < 1 {
//         alert("Please select at least one file.");
//         return;
//     }
//     if filelist.get(0) == None {
//         alert("Please select a valid file");
//         return;
//     }
//
//     let file = filelist.get(0).expect("Failed to get File from filelist!");
//
//     let file_reader : web_sys::FileReader = match web_sys::FileReader::new() {
//         Ok(f) => f,
//         Err(e) => {
//             alert("There was an error creating a file reader");
//             log(&JsValue::as_string(&e).expect("error converting jsvalue to string."));
//             web_sys::FileReader::new().expect("")
//         }
//     };
//
//     let fr_c = file_reader.clone();
//     // create onLoadEnd callback
//     let onloadend_cb = Closure::wrap(Box::new(move |_e: web_sys::ProgressEvent| {
//         let array = js_sys::Uint8Array::new(&fr_c.result().unwrap());
//         let len = array.byte_length() as usize;
//         log(&format!("Blob received {}bytes: {:?}", len, array.to_vec()));
//         // here you can for example use the received image/png data
//
//         let db : Database = Database::new(array);
//
//         //Prepare a statement
//         let stmt : Statement = db.prepare(&sql_helper_utility::sql_load_accounts_with_balances());
//         stmt.getAsObject();
//
//         // Bind new values
//         stmt.bind();
//
//         while stmt.step() { //
//             let row = stmt.getAsObject();
//             log(&("Here is a row: ".to_owned() + &stringify(row).to_owned()));
//         }
//
//     }) as Box<dyn Fn(web_sys::ProgressEvent)>);
//
//     file_reader.set_onloadend(Some(onloadend_cb.as_ref().unchecked_ref()));
//     file_reader.read_as_array_buffer(&file).expect("blob not readable");
//     onloadend_cb.forget();
// }
