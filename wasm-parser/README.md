Install rust at https://www.rust-lang.org/tools/install

Install the wasm specific stuff:
`cargo install -f wasm-bindgen-cli`

And install `wasm-pack` from https://rustwasm.github.io/wasm-pack/installer/

Build with
`wasm-pack build --target web`

Copy it to the website directory so it can be read in
`cp pkg/wasm_parser_* ../website/public/build`
