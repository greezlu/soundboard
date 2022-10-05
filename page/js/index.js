let manager = new Manager();
let builder = new Builder();

builder.load();
builder.setClickEvent(manager.click.bind(manager));
