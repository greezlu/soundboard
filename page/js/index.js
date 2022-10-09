let manager = new Manager(0.5);
let builder = new Builder();

builder.load();
builder.setClickEvent(manager.click.bind(manager));
