const treeBody = document.getElementById('tree-body');
const needleCount = 5000; // Anzahl der Punkte
const needleSize = 4; // Größe der Punkte in Pixeln
const needles = [];

// Create needles
for (let i = 0; i < needleCount; i++) {
    const needle = document.createElement('div');
    needle.className = 'needle';
    
    // Set size from variable
    needle.style.width = `${needleSize}px`;
    needle.style.height = `${needleSize * 2}px`;
    
    // Initial position - set once
    updateNeedlePosition(needle);
    
    needle.style.backgroundColor = '#006400'; // Start green
    treeBody.appendChild(needle);
    needles.push({
        element: needle
    });
}

function updateNeedlePosition(needle) {
    // Triangle bounds: bottom is 0, top is 500 (height of tree body)
    // To achieve a uniform distribution over the area of the triangle, 
    // we use the square root of a random number for the height.
    const h = 500 * Math.sqrt(Math.random());
    const maxW = (h / 500) * 400;
    const x = (Math.random() * maxW) - (maxW / 2);
    
    needle.style.left = `${x + 200}px`; // 200 is center of 400px container
    needle.style.top = `${h}px`;
}

// Update colors every second - positions remain fixed
setInterval(() => {
    const specialColors = ['#ff0000', '#ffa500', '#ffff00'];
    
    needles.forEach(n => {
        const isGreen = Math.random() < 0.85;
        
        if (isGreen) {
            n.element.style.backgroundColor = '#006400';
        } else {
            n.element.style.backgroundColor = specialColors[Math.floor(Math.random() * specialColors.length)];
        }
    });
}, 1000);