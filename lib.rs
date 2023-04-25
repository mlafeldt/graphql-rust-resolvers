use std::sync::Mutex;

use gloo_console::log;
use wasm_bindgen::prelude::*;

lazy_static::lazy_static! {
    static ref COUNTER: Mutex<usize> = Mutex::new(0);
}

#[wasm_bindgen]
pub fn counter() -> Result<usize, JsValue> {
    console_error_panic_hook::set_once();

    let mut counter = COUNTER.lock().map_err(|e| e.to_string())?;
    *counter += 1;

    log!(format!("counter = {}", *counter));

    Ok(*counter)
}

// TODO: provide a better interface, possibly via a macro or code generation
#[wasm_bindgen]
pub fn username(_parent: JsValue, args: JsValue, _context: JsValue, _info: JsValue) -> Result<String, JsValue> {
    console_error_panic_hook::set_once();

    #[derive(serde::Deserialize)]
    struct Args {
        id: String,
    }

    let args: Args = serde_wasm_bindgen::from_value(args)?;
    let name = format!("User #{}", args.id);

    log!(format!("username = {:?}", name));

    Ok(name)
}
