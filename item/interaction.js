export default class interaction {
	constructor(x, y, interactionName, width, height, dir, visible) {
		this.x = x || 0;
		this.y = y || 0;
		this.interactionName = interactionName;

		this.state = 1;
		//dir => up : 0, right : 1, down : 2, left : 3
		//dir => down : 0, left : 1, right : 2, up : 3
		this.dir = dir;
		
		// this.img = document.querySelector("#enemy");
		this.width = width
		this.height = height
	}
	draw(ctx) {
		// 상호작용 영역 표시
		// ctx.beginPath();
		// ctx.rect(this.x, this.y, this.width, this.height);
		// ctx.strokeStyle = "red";
		// ctx.stroke();
		// ctx.closePath();
		// 상호작용 영역 표시
	}

	update() {
	}
}