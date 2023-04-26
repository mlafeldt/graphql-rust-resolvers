use std::sync::Mutex;

use gloo_console::log;
use once_cell::sync::Lazy;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Query;

#[wasm_bindgen]
impl Query {
    // TODO: provide a better interface, possibly via a macro or code generation
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
}

#[wasm_bindgen]
pub struct Mutation;

static COUNTER: Lazy<Mutex<usize>> = Lazy::new(|| Mutex::new(0));

#[wasm_bindgen]
impl Mutation {
    pub fn counter() -> Result<usize, JsValue> {
        console_error_panic_hook::set_once();

        let mut counter = COUNTER.lock().map_err(|e| e.to_string())?;
        *counter += 1;

        log!(format!("counter = {}", *counter));

        Ok(*counter)
    }
}
