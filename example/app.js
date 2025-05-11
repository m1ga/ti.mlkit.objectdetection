import mlkitDetection from 'ti.mlkit.objectdetection';

const win = Ti.UI.createWindow();
const img = Ti.UI.createImageView({
	image: "deborah-cortelazzi-gREquCUXQLI-unsplash.jpg"
})
const viewOverlay = Ti.UI.createView({
	height: Ti.UI.SIZE,
	width: Ti.UI.SIZE
});
viewOverlay.add(img);
win.add(viewOverlay);
win.addEventListener("open", function() {
	mlkitDetection.detect({
		image: img.toImage()
	})
})

mlkitDetection.addEventListener("detected", function(e) {
	let imgWidth = img.rect.width;
	let imgHeight = img.rect.height;
	let orgWidth = img.toImage().width;
	let orgHeight = img.toImage().height;

	let item = e.data;
	for (var i = 0; i < item.length; ++i) {

		if (item[i].object && item[i].object.length > 0) {
			let lbl = Ti.UI.createLabel({
				text: item[i].object[0].label.text + " (" + item[i].object[0].label.confidence.toFixed(2) + ")",
				left: item[i].left / orgWidth * imgWidth,
				top: item[i].top / orgHeight * imgHeight - 15,
				color: "#000",
				font: {
					fontSize: 12
				}
			})
			let view = Ti.UI.createView({
				borderWidth: 2,
				borderColor: "yellow",
				left: item[i].left / orgWidth * imgWidth,
				top: item[i].top / orgHeight * imgHeight,
				width: (item[i].right - item[i].left) / orgWidth * imgWidth,
				height: (item[i].bottom - item[i].top) / orgHeight * imgHeight,
			})

			viewOverlay.add(view);
			viewOverlay.add(lbl);
		}
	}
})
win.open();
