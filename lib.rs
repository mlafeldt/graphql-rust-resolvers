use std::sync::Mutex;

use gloo_console::log;
use wasm_bindgen::prelude::*;

lazy_static::lazy_static! {
    static ref COUNTER: Mutex<usize> = Mutex::new(0);
}

#[wasm_bindgen]
pub fn counter() -> usize {
    console_error_panic_hook::set_once();

    let mut counter = COUNTER.lock().unwrap();
    *counter += 1;
    log!(format!("counter = {}", *counter));
    *counter
}

#[wasm_bindgen]
pub fn username(_parent: JsValue, args: JsValue, _context: JsValue, _info: JsValue) -> String {
    console_error_panic_hook::set_once();

    #[derive(serde::Deserialize)]
    struct Args {
        id: String,
    }

    let args: Args = serde_wasm_bindgen::from_value(args).unwrap();
    let name = format!("User #{}", args.id);
    log!(format!("username = {:?}", name));
    name
}
