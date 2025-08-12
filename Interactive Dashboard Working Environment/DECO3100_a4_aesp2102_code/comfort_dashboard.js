
// Create a donut chart for noise data
function createDonutChart(id) {
  Plotly.newPlot(id, [{
    values: [30, 50, 20],
    labels: ['Loud', 'Moderate', 'Quiet'],
    type: 'pie',
    hole: 0.5,
    textinfo: 'label+percent',
    marker: {
      colors: ['#1e40af', '#3b82f6', '#93c5fd']
    }
  }], {
    margin: { t: 30, b: 10, l: 10, r: 10 },
    showlegend: true,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    responsive: true
  });
}

// Create a smooth line graph for temperature or lighting
function createLineGraph(id, values, yLabel) {
  const xLabels = ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'];
  const yMin = Math.min(...values);
  const yMax = Math.max(...values);
  const yPadding = (yMax - yMin) * 0.1;

  Plotly.newPlot(id, [{
    x: xLabels,
    y: values,
    type: 'scatter',
    mode: 'lines+markers+text',
    fill: 'tozeroy',
    fillcolor: 'rgba(59, 130, 246, 0.1)',
    line: {
      color: '#3b82f6',
      width: 3,
      shape: 'spline',
      smoothing: 1.3
    },
    marker: {
      color: '#3b82f6',
      size: 8,
      line: { width: 1.5, color: '#fff' }
    },
    text: values.map(String),
    textposition: 'top center',
    textfont: {
      size: 12,
      color: '#1e3a8a'
    }
  }], {
    height: 400,
    width: 1750,
    margin: { t: 60, b: 50, l: 60, r: 30 },
    showlegend: false,
    xaxis: {
      title: 'Time of Day',
      tickfont: { size: 12 },
      showgrid: false
    },
    yaxis: {
      title: yLabel,
      tickfont: { size: 12 },
      gridcolor: '#e0f2fe',
      range: [yMin - yPadding, yMax + yPadding]
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    responsive: true
  });
}

// Toggle button for enabling dark mode
function enableDarkModeToggle() {
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = "🌙 Toggle Dark Mode";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "20px";
  toggleBtn.style.right = "20px";
  toggleBtn.style.padding = "10px 14px";
  toggleBtn.style.background = "#3b82f6";
  toggleBtn.style.color = "#fff";
  toggleBtn.style.border = "none";
  toggleBtn.style.borderRadius = "8px";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.zIndex = "999";

  toggleBtn.onclick = () => {
    document.body.classList.toggle("dark-mode");
  };

  document.body.appendChild(toggleBtn);
}

// Initialize graphs and interactions after page loads
document.addEventListener("DOMContentLoaded", function () {
  const temperatureValues = [21.5, 23.1, 24.7, 22.8, 21.9, 20.5];
  const lightingValues = [300, 420, 500, 460, 390, 320];

  if (window.Plotly) {
    createLineGraph("tempPlot", temperatureValues, "Temperature (°C)");
    createDonutChart("noisePlot");
    Plotly.newPlot("lightPlot", [{x: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM"], y: lightingValues, type: "scatter", mode: "lines+markers", fill: "tozeroy", fillcolor: "rgba(59, 130, 246, 0.1)", line: {color: "#3b82f6", width: 2, shape: "spline"}, marker: {color: "#3b82f6", size: 6, line: {width: 1, color: "#fff"}}}], {height: 260, width: 700, margin: {t: 40, b: 40, l: 50, r: 20}, showlegend: false, xaxis: {title: "Time of Day", tickfont: {size: 11}}, yaxis: {title: "Light (Lux)", tickfont: {size: 11}, gridcolor: "#e0f2fe"}, paper_bgcolor: "transparent", plot_bgcolor: "transparent", responsive: true});
  }

  if (typeof Swiper !== "undefined") {
    new Swiper(".suggestion-slider", {
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
