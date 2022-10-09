let manager = new Manager(0.5);
let builder = new Builder();
let slider = new Slider(manager);

builder.load();
builder.setClickEvent(manager.click.bind(manager));
