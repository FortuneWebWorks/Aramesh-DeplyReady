const them = document.querySelector('.dark');
// // fetch json data
import { data } from './data/data-new.js';

export const configSmallerLineChart = {
  containerClass: 'line-chart',
  canvasId: 'line-chart',
  cnavasSizeId: 'line-chart-size',
  labelsId: 'line-chart-labels',
  titleId: 'line-chart-title',
  hoverClass: 'line-chart-hover',
  sizeY: 5,
  sizeX: 5,
  color: '#222',
  title: 'نمودار آسیب شناسی فرایند',
};
export const configBigLineChart = {
  containerClass: 'biger-line-chart',
  canvasId: 'biger-line-chart',
  cnavasSizeId: 'biger-line-chart-size',
  labelsId: 'biger-line-chart-labels',
  titleId: 'biger-line-chart-title',
  hoverClass: 'biger-line-chart-hover',
  sizeY: 5,
  sizeX: 7,
  color: '#222',
  title: 'نمودار آسیب شناسی محتوا',
};
export const configEpChart = {
  containerClass: 'Content-process-members-container',
  canvasId: 'Content-process-members-chart',
  cnavasSizeId: 'Content-process-members-chart-size',
  labelsId: 'Content-process-members-chart-labels',
  titleId: 'Content-process-members-chart-title',
  hoverClass: 'Content-process-members-chart-hover',
  pointValueId: 'Content-process-members-chart-point-value',
  title: 'دیاگرام یکپارچگی خانواده',
};
export const configFamilyChart = {
  containerClass: 'Content-process-family-container',
  canvasId: 'Content-process-family-chart',
  cnavasSizeId: 'Content-process-family-chart-size',
  labelsId: 'Content-process-family-chart-labels',
  titleId: 'Content-process-family-chart-title',
  hoverClass: 'Content-process-family-chart-hover',
  pointValueId: 'Content-process-family-chart-point-value',
  title: 'دیاگرام گونه شناسی خانواده',
};
export const configBarChart = {
  containerClass: 'bar-chart-container',
  canvasId: 'bar-chart',
  cnavasSizeId: 'bar-chart-size',
  labelsId: 'bar-chart-labels',
  titleId: 'bar-chart-title',
  hoverClass: 'bar-chart-hover',
  sizeY: 5,
  sizeX: 5,
  color: '#222',
  title: 'نمودار یکپارچگی بین فردی اعضای خانواده',
};

// async function grabData() {
//   const response = await fetch('./data/data.json', {
//     headers: {
//       'Content-Type': 'application/json',

//     },
//   });

//   const data = await response.json();

//   // create config
//   const configSmallerLineChart = {
//     canvasId: 'line-chart',
//     cnavasSizeId: 'line-chart-size',
//     labelsId: 'line-chart-labels',
//     titleId: 'line-chart-title',
//     hoverClass: 'line-chart-hover',
//     sizeY: 5,
//     sizeX: 5,
//   };
//   const configBigLineChart = {
//     canvasId: 'biger-line-chart',
//     cnavasSizeId: 'biger-line-chart-size',
//     labelsId: 'biger-line-chart-labels',
//     titleId: 'biger-line-chart-title',
//     hoverClass: 'biger-line-chart-hover',
//     sizeY: 5,
//     sizeX: 7,
//   };
//   const configEpChart = {
//     canvasId: 'ep-chart',
//     cnavasSizeId: 'ep-chart-size',
//     labelsId: 'ep-chart-labels',
//     titleId: 'ep-chart-title',
//     hoverClass: 'ep-chart-hover',
//     pointValueId: 'ep-chart-point-value',
//   };
//   const configFamilyChart = {
//     canvasId: 'family-chart',
//     cnavasSizeId: 'family-chart-size',
//     labelsId: 'family-chart-labels',
//     titleId: 'family-chart-title',
//     hoverClass: 'family-chart-hover',
//     pointValueId: 'family-chart-point-value',
//   };
//   const configFamilyChart2 = {
//     canvasId: 'ffamily-chart',
//     cnavasSizeId: 'ffamily-chart-size',
//     labelsId: 'ffamily-chart-labels',
//     titleId: 'ffamily-chart-title',
//     hoverClass: 'ffamily-chart-hover',
//     pointValueId: 'ffamily-chart-point-value',
//   };
//   const configBarChart = {
//     canvasId: 'bar-chart',
//     cnavasSizeId: 'bar-chart-size',
//     labelsId: 'bar-chart-labels',
//     titleId: 'bar-chart-title',
//     hoverClass: 'bar-chart-hover',
//     sizeY: 5,
//     sizeX: 5,
//   };
//   const configBarChart2 = {
//     canvasId: 'hbar-chart',
//     cnavasSizeId: 'hbar-chart-size',
//     labelsId: 'hbar-chart-labels',
//     titleId: 'hbar-chart-title',
//     hoverClass: 'hbar-chart-hover',
//   };
//   // create charts
//   // lineChart(data, configSmallerLineChart);
//   lineChart(data, configBigLineChart);
//   epChart(data, configEpChart);
//   familyChart(data, configFamilyChart);
//   barChart(data, configBarChart);
//   // barChart(data, configBarChart2);
// }
// grabData();
// line chart driver

export function lineChart(data, config) {
  let resWidth;
  let resHeight;
  if (window.innerWidth < 760) {
    resWidth = 1.4;
    resHeight = 1.4;
  } else {
    resWidth = 3;
    resHeight = 3;
  }

  // create canvas and constructor
  const html = `
  <div class="canvas-size" style="text-align: center" id="${config.cnavasSizeId}">
      <h2>${config.title}</h2>
      <canvas class="canvas" style="text-align: center" id="${config.canvasId}"></canvas>
      <span id="${config.titleId}"></span>
    </div>
    <div class="labels" id="${config.labelsId}"></div>
  `;
  const div = document.createElement('div');
  div.className = `chart ${config.containerClass}`;
  div.innerHTML = html;
  document.querySelector('.charts-container').appendChild(div);

  // responsiveness
  window.addEventListener('resize', () => {
    if (window.innerWidth < 760) {
      resWidth = 1.4;
      resHeight = 1.4;
    } else {
      resWidth = 2.75;
      resHeight = 2.75;
    }
    canvas.width =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resWidth;

    canvas.height =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resHeight;

    const labes = document.getElementById(`${config.labelsId}`);
    let element = undefined;
    if (labes.querySelector(`.${config.hoverClass}`)) {
      let labels1 = [];
      let labels2 = [];
      let merg = [];
      labels1 = Array(data['children']);
      labels2 = Array(data['parents']);
      element = labes.querySelector(`.${config.hoverClass}`).classList;

      labels2[0].forEach((item) => {
        merg.push(item);
      });
      labels1[0].forEach((item) => {
        merg.push(item);
      });

      let res = merg.filter((item) => item.role === element[0]);
      if (res.length > 0) {
        update();
        addPoints(res[0], res[0].role);
        outChart.pointConnect();
        labes
          .querySelector(`.${res[0].role}`)
          .classList.add(`${config.hoverClass}`);
      } else {
        update();
        defaultPoint();
      }
    } else {
      x = 0;
      update();
    }
  });

  // Line Chart setup
  const canvas = document.getElementById(`${config.canvasId}`);
  const ctx = canvas.getContext('2d');
  let x = 0;
  let outChart = undefined;
  const title = document.getElementById(`${config.titleId}`);

  canvas.width =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resWidth;

  canvas.height =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resHeight;

  let addPoints, defaultPoint, addLabel, update;

  // line chart
  class LineChart {
    constructor(f) {
      // sizes
      if (config.sizeX <= 5) {
        this.sizeX = config.sizeX - 0.5 + 1;
      } else {
        this.sizeX = config.sizeX - 0.4 + 1;
      }
      this.sizeY = config.sizeY + 1;
      // font size
      this.fontSize = f;
      // color
      this.color = config.color;
      this.connectColor = config.connectLineColor;
      // y axis
      this.ay = canvas.height / this.sizeY;
      // x axis
      this.ax = canvas.width / this.sizeX;
      this.cw = canvas.width;
      this.ch = canvas.height;
      // animation speed
      this.dx = 3;
      this.dy = 2;
      // point axises
      this.startPX = 20;
      this.startPy = 0;
      this.px = undefined;
      this.py = undefined;
      // create line funciton
      this.drawLine = null;
      // points for hover
      this.count = 0;
      this.pers = [];
      // each person position data
      this.positions = [];
      this.tempValuesData = [];
      this.valuesData = [];
      // colors
      this.colors = {
        father: '#7b72db',
        mother: '#79d2de',
        daughter: '#eccd66',
        son: '#ee8a48',
      };
      // text locations
      this.textLoc = [];
      // nedded data
      this.need = [];
      if (this.sizeX <= 6) {
        // points short names
        this.need = ['CS', 'PS', 'RFC', 'Cstra', 'RB'];
        // long names
        this.longNames = [
          'Communication Skills',
          'Problem Solving and Decision making',
          'Respect and Family Cohesion',
          'Coping Strategies',
          'Religious Beliefs',
        ];
      } else {
        // points short names
        this.need = ['JE', 'TT', 'FS', 'PP', 'AP', 'LS', 'EF'];
        // long names
        this.longNames = [
          'Job and Education',
          'Time Togetherness',
          'Financial Resource',
          'Physical and Psychological Health',
          'Appearance and Prestige',
          'Living space',
          'Educational Facilitates',
        ];
      }
    }

    drawChart() {
      // draw the chart x & y
      // x axis
      ctx.beginPath();
      ctx.moveTo(0, this.ch);
      ctx.font = `${this.fontSize}px Arial`;
      ctx.fillStyle = config.color;
      for (let i = 1; i < this.sizeY; i++) {
        ctx.fillText(`${this.sizeY - i}`, 10, this.ay * (i + 0.5));
      }
      ctx.stroke();
      ctx.closePath();
      // X axis
      for (let i = 0; i < this.sizeX - 1; i++) {
        ctx.moveTo(this.ax * (i + 0.8), this.ch - 13);
        ctx.lineTo(this.ax * (i + 0.8), this.ch - 17);
      }
      ctx.strokeStyle = this.color;
      ctx.stroke();
      // create Path2D
      for (let i = 0; i < this.sizeX; i++) {
        this[`${this.need[i]}`] = new Path2D();
      }

      ctx.beginPath();
      ctx.font = `${this.fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = this.color;
      if (this.sizeX <= 5) {
        for (let i = 0; i < this.sizeX - 1; i++) {
          // add hover points
          this[`${this.need[i]}`].arc(
            this.ax * (i + 0.8),
            this.ch - 5,
            10,
            0,
            Math.PI * 2
          );

          // write name
          ctx.fillText(`${this.need[i]}`, this.ax * (i + 0.8), this.ch);

          // add hover points names
          this.textLoc.push({
            path: this[`${this.need[i]}`],
            name: `${this.longNames[i]}`,
            loc: {
              x: this.ax * 4.8,
              y: this.ch - 5,
            },
          });
        }
      } else {
        for (let i = 0; i < this.sizeX - 1; i++) {
          // add hover points
          this[`${this.need[i]}`].arc(
            this.ax * (i + 0.8),
            this.ch - 5,
            10,
            0,
            Math.PI * 2
          );

          // write name
          ctx.fillText(`${this.need[i]}`, this.ax * (i + 0.8), this.ch);

          // add hover points names
          this.textLoc.push({
            path: this[`${this.need[i]}`],
            name: `${this.longNames[i]}`,
            loc: {
              x: this.ax * 4.8,
              y: this.ch - 5,
            },
          });
        }
      }

      // middle line X axis
      ctx.beginPath();
      ctx.moveTo(20, this.ay * (this.sizeY / 2 + 0.5) - this.fontSize / 3);
      ctx.lineTo(
        this.cw - 10,
        this.ay * (this.sizeY / 2 + 0.5) - this.fontSize / 3
      );
      ctx.lineWidth = '1';
      ctx.strokeStyle = this.color;
      ctx.stroke();
      // top line X axis
      ctx.beginPath();
      ctx.moveTo(20, this.ay * 1.1);
      ctx.lineTo(this.cw - 20, this.ay * 1.1);
      ctx.lineWidth = '1.5';
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      // bottom line X axis
      ctx.moveTo(20, this.ch - 17);
      ctx.lineTo(this.cw - 20, this.ch - 17);
      ctx.lineWidth = '1.5';
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();
    }

    addPoint(points, role) {
      // the x and y from data
      let pointsData = this.need.map((item) => {
        return points['results'][0][item.toLowerCase()];
      });

      if (pointsData) {
        pointsData.forEach((point, index) => {
          let x = index + 1;
          let y = point;
          x -= 0.275;
          y -= 0.5;
          this.px = this.ax * x + this.fontSize / 3;
          this.py = Math.abs(this.ay * y - this.ch) - this.fontSize / 3;

          this.positions.push({
            x: this.px,
            y: this.py,
            role,
          });

          if (index === pointsData.length - 1) {
            this.pointConnect();
            this.positions = [];
          }

          let rl = role.split('-');
          rl = rl[0].trim();

          if (rl === 'دختر') {
            ctx.globalCompositeOperation = 'source-over';
            const girl = new Path2D();
            ctx.beginPath();
            ctx.moveTo(this.px, this.py);
            girl.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
            ctx.arc(this.px, this.py, 6, 0, Math.PI * 2, false);
            ctx.fillStyle = this.colors['daughter'];
            ctx.fill();
            ctx.closePath();
            this.pers.push({ name: role, path: girl });
          }
          if (rl === 'مادر') {
            ctx.globalCompositeOperation = 'source-over';
            const mother = new Path2D();
            ctx.beginPath();
            ctx.moveTo(this.px, this.py - 7);
            mother.arc(this.px, this.py, 7, 0, Math.PI * 2, false);
            ctx.lineTo(this.px, this.py - 7);
            ctx.lineTo(this.px - 7, this.py + 7);
            ctx.lineTo(this.px + 7, this.py + 7);
            ctx.lineTo(this.px, this.py - 7);
            ctx.fillStyle = this.colors['mother'];
            ctx.fill();
            ctx.closePath();
            this.pers.push({ name: role, path: mother });
          }
          if (rl === 'پدر') {
            ctx.globalCompositeOperation = 'source-over';
            const father = new Path2D();
            ctx.beginPath();
            ctx.moveTo(this.px - 5, this.py - 5);
            father.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
            ctx.rect(this.px - 5, this.py - 5, 10, 10);
            ctx.fillStyle = this.colors['father'];
            ctx.fill();
            ctx.closePath();
            this.pers.push({ name: role, path: father });
          }
          if (rl === 'پسر') {
            ctx.globalCompositeOperation = 'source-over';
            const son = new Path2D();
            ctx.beginPath();
            ctx.moveTo(this.px, this.py - 7);
            son.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
            ctx.lineTo(this.px - 15 / 2, this.py + 15 / 2 - 7);
            ctx.lineTo(this.px, this.py + 15 - 7);
            ctx.lineTo(this.px + 15 / 2, this.py + 15 / 2 - 7);
            ctx.fillStyle = this.colors['son'];
            ctx.fill();
            ctx.closePath();
            this.pers.push({ name: role, path: son });
          }
          if (role === 'family') {
          }
        });
      }

      this.drawLine = () => {
        ctx.beginPath();
        ctx.moveTo(20, this.py);
        ctx.lineTo(this.px, this.py);
        ctx.lineTo(this.px, this.ch - 15);
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();
      };
      // this.drawLine();
    }

    filterLabelData() {
      this.valuesData = [];
      for (let i = 0; i < this.tempValuesData.length / 2; i++) {
        this.valuesData.push(this.tempValuesData[i]);
      }
    }

    pointConnect() {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      this.positions.forEach((item, index) => {
        if (this.positions[index]) {
          ctx.lineTo(this.positions[index].x, this.positions[index].y);

          let sepreate = item.role.split('-');
          if (sepreate.length > 1) {
            ctx.strokeStyle = this.colors[sepreate[1]];
          } else {
            ctx.strokeStyle = this.colors[sepreate];
          }
        }
      });
      ctx.lineWidth = '2';
      ctx.stroke();
      ctx.closePath();
    }

    addLabel(role) {
      this.valuesData.push(role);
      this.displayLabels();
    }

    displayLabels() {
      let html = ``;
      this.valuesData.forEach((item, index) => {
        let imgSrc;
        let rl = item.split('-');
        rl = rl[0].trim();

        if (rl === 'دختر') {
          imgSrc = 'daughter';
        }
        if (rl === 'مادر') {
          imgSrc = 'mother';
        }
        if (rl === 'پدر') {
          imgSrc = 'father';
        }
        if (rl === 'پسر') {
          imgSrc = 'son';
        }

        html += `
        <div class="${imgSrc} ${index}">
        <span class="${imgSrc} ${index}" data-before="${item}" style="color: gray;
        "></span>
          <img class="${imgSrc} ${index}" src="/images/${imgSrc}.svg" alt="">
        </div>
        `;
      });
      let div = ``;
      div = `
      <div class="family">
        <span class="family" style="color: gray"></span>
        <img class="family" src="/images/family.svg" alt="">
      </div>
    `;
      const labels = document.getElementById(`${config.labelsId}`);
      labels.innerHTML = `${div}
      ${html}`;
    }

    hover() {
      canvas.addEventListener('mousemove', (e) => {
        let mouse = this.mousePos(e);

        window.addEventListener('mousemove', (e) => {
          if (!e.target.classList.contains('canvas')) {
            this.textLoc.forEach((text) => {
              if (!ctx.isPointInPath(text.path, mouse.x, mouse.y)) {
                title.innerText = '';
              }
            });
          }
        });

        // text
        this.textLoc.forEach((text) => {
          if (!ctx.isPointInPath(text.path, mouse.x, mouse.y)) {
            title.innerText = '';
          }
        });

        this.textLoc.forEach((text) => {
          if (ctx.isPointInPath(text.path, mouse.x, mouse.y)) {
            title.innerText = text.name;
          }
        });
      });
    }

    roleFinder(item) {
      let rl;
      let res;
      if (item) {
        rl = item.split('-');
        rl = rl[0].trim();

        if (rl === 'دختر') {
          res = 'daughter';
        }
        if (rl === 'مادر') {
          res = 'mother';
        }
        if (rl === 'پدر') {
          res = 'father';
        }
        if (rl === 'پسر') {
          res = 'son';
        }
        if (rl === 'family') {
          res = 'family';
        }
      }

      return res;
    }

    click() {
      let labels1 = [];
      let labels2 = [];
      let merg = [];
      let mergRole = [];
      labels1 = Array(data['children']);
      labels2 = Array(data['parents']);

      labels2[0].forEach((item) => {
        merg.push(item);
      });
      labels1[0].forEach((item) => {
        merg.push(item);
      });
      labels2[0].forEach((item) => {
        mergRole.push(item.role);
      });
      labels1[0].forEach((item) => {
        mergRole.push(item.role);
      });
      document
        .getElementById(`${config.labelsId}`)
        .addEventListener('click', (e) => {
          merg.forEach((label) => {
            if (e.target.getAttribute('data-before') === label.role) {
              addLabel();
              let peoples = merg;
              let targetRole = e.target.getAttribute('data-before');

              let people = peoples.find((item) => {
                return item.role === targetRole;
              });

              update();
              addPoints(people, people.role);
              outChart.pointConnect();

              // document
              //   .getElementById(`${config.labelsId}`)
              //   .querySelector(`.${e.target.classList[0]}`)
              //   .classList.add(`${config.hoverClass}`);
              e.target.classList.add(config.hoverClass);

              this.shadowGiver(label.role);
            }
          });

          if (e.target.classList.contains('family')) {
            update();
            addLabel();

            let peoples = merg;
            for (let i = 0; i < peoples.length; i++) {
              addPoints(peoples[i], peoples[i].role);
            }
            document
              .getElementById(`${config.labelsId}`)
              .querySelector('.family')
              .classList.add(`${config.hoverClass}`);

            this.shadowGiver('family');
          }
        });
    }

    mousePos(e) {
      let ClientRect = canvas.getBoundingClientRect();
      return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top),
      };
    }

    shadowGiver(role) {
      const colors = [
        {
          rol: 'family',
          color: '#9ad6c0',
        },
        {
          rol: 'father',
          color: '#9c97cc',
        },
        {
          rol: 'mother',
          color: '#9dbdc2',
        },
        {
          rol: 'son',
          color: '#d4b9a7',
        },
        {
          rol: 'daughter',
          color: '#dbcfa4',
        },
      ];

      let currRole = colors.filter((item) => {
        return item.rol === this.roleFinder(role);
      });

      const el = document
        .getElementById(`${config.labelsId}`)
        .querySelector(`[data-before="${role}"]`);

      if (el) {
        el.parentElement.style.boxShadow = `inset -21px 21px 24px ${currRole[0].color}, inset 21px -21px 24px #a8a3d83d`;
      } else {
        document
          .getElementById(`${config.labelsId}`)
          .querySelector(
            `.${this.roleFinder(role)}`
          ).style.boxShadow = `inset -21px 21px 24px ${currRole[0].color}, inset 21px -21px 24px #a8a3d83d`;
      }
    }
  }

  // line chart
  addPoints = function (data, role) {
    outChart.addPoint(data, role);
    outChart.filterLabelData();
  };

  defaultPoint = function () {
    let labels1 = [];
    let labels2 = [];
    let merg = [];
    labels1 = Array(data['children']);
    labels2 = Array(data['parents']);

    labels2[0].forEach((item) => {
      merg.push(item);
    });
    labels1[0].forEach((item) => {
      merg.push(item);
    });

    let peoples = merg;
    for (let i = 0; i < peoples.length; i++) {
      addPoints(peoples[i], peoples[i].role);
    }
    document
      .getElementById(`${config.labelsId}`)
      .querySelector('.family')
      .classList.add(`${config.hoverClass}`);
  };

  addLabel = function () {
    let labels1 = [];
    let labels2 = [];
    let merg = [];
    labels1 = Array(data['children']);
    labels2 = Array(data['parents']);

    labels2[0].forEach((item) => {
      merg.push(item);
    });
    labels1[0].forEach((item) => {
      merg.push(item);
    });

    let labels = merg;
    labels = labels.map((item) => {
      return item.role;
    });
    labels.forEach((label) => {
      outChart.addLabel(label);
    });
  };

  update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const chart = new LineChart(12);
    outChart = chart;
    chart.drawChart();
    if (x === 0) {
      addLabel();
      chart.click();
      defaultPoint();
      chart.shadowGiver('family');
      x++;
    }
    chart.hover();
  };
  update();
}
// bar chart driver
export function barChart(data, config) {
  let resWidth;
  let resHeight;
  if (window.innerWidth < 660) {
    resWidth = 800; // 600
    resHeight = 1.3;
  } else {
    resWidth = 1000;
    resHeight = 2.7; // 2.2
  }

  // create canvas and constructor
  const html = `
      <h2  style="text-align: center" >${config.title}</h2>
      <div class="canvas-size" id="${config.cnavasSizeId}">
        <canvas class="canvas" id="${config.canvasId}"></canvas>
      </div>
      <div class="labels" id="${config.labelsId}"></div>
    `;
  const div = document.createElement('div');
  div.className = `${config.containerClass}`;
  div.innerHTML = html;
  document.querySelector('.charts-container').appendChild(div);

  // responsiveness
  window.addEventListener('resize', () => {
    canvas.width = resWidth;

    canvas.height =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resHeight;

    bupdate();
  });

  // bar chart setup
  const canvas = document.getElementById(`${config.canvasId}`);
  const ctx = canvas.getContext('2d');

  canvas.width = resWidth;

  canvas.height =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resHeight;

  // Bar Chart
  class BarChart {
    constructor() {
      // data y axis number
      this.dataX = data['integration'];
      // data keys array
      this.keys = this.dataX.map((item) => {
        return item.role;
      });
      // font size
      this.fontSize = 15;
      // color
      this.color = config.color;
      // titles came from datas
      this.titles = this.dataX.map((item) => {
        return item.role;
      });
      // y axis
      this.ay = canvas.height / 6;
      // x axis
      this.ax = canvas.width / this.dataX.length - 3;
      this.cw = canvas.width;
      this.ch = canvas.height;
      // animation speed
      this.dx = 3;
      this.dy = 2;
      // point axises
      this.startPX = 20;
      this.startPy = 0;
      this.px = undefined;
      this.py = undefined;
      // create line funciton
      this.drawLine = null;
      // points for hover
      this.count = 0;
      this.pers = [];
      // each person position data
      this.positions = [];
      this.tempValuesData = [];
      this.valuesData = [];
      // colors
      this.father = '#7b72db';
      this.mother = '#79d2de';
      this.girl = '#eccd66';
      this.son = '#ee8a48';
      this.colors = ['#7b72db', '#79d2de', '#eccd66', '#ee8a48'];
      // x axis titles distance
      this.tDis = 0.8;
    }

    drawChart() {
      // x axis
      ctx.beginPath();
      ctx.moveTo(0, this.ch);
      ctx.font = `${this.fontSize}px Arial`;
      ctx.fillStyle = this.color;

      ctx.fillText('5', 10, this.ay * 1.5);
      ctx.fillText('4', 10, this.ay * 2.5);
      ctx.fillText('3', 10, this.ay * 3.5);
      ctx.fillText('2', 10, this.ay * 4.5);
      ctx.fillText('1', 10, this.ay * 5.5);

      ctx.stroke();
      ctx.closePath();
      // bottom line X axis
      ctx.beginPath();
      ctx.moveTo(20, this.ch - 25);
      ctx.lineTo(this.cw, this.ch - 25);
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();
      // middle line X axis
      ctx.beginPath();
      ctx.moveTo(20, this.ay * 3.5 - this.fontSize / 3);
      ctx.lineTo(this.cw - 10, this.ay * 3.5 - this.fontSize / 3);
      ctx.lineWidth = '1';
      ctx.strokeStyle = this.color;
      ctx.stroke();
      // top line X axis
      ctx.beginPath();
      ctx.moveTo(20, this.ay * 1.1);
      ctx.lineTo(this.cw, this.ay * 1.1);
      ctx.lineWidth = '1.5';
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();

      // titles point
      for (let i = 0; i < this.dataX.length; i++) {
        ctx.moveTo(this.ax * (i + 0.8), this.ch - 20);
        ctx.lineTo(this.ax * (i + 0.8), this.ch - 25);
      }
      ctx.stroke();

      ctx.font = `${this.fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = this.color;
      ctx.beginPath();

      this.titles.forEach((title) => {
        ctx.fillText(`(${title}`, this.ax * this.tDis, this.ch - 2);

        this.tDis++;
      });

      // add points
      for (let i = 0; i < this.dataX.length; i++) {
        this.addPoint({
          name: this.dataX[i].role,
          value: this.dataX[i]['integration'],
        });
      }
    }

    addPoint(data) {
      let numOfParts = data.value - 1;
      let dataVal = data.value - 1;
      let finalRes;
      let pxFind = this.keys.findIndex((key) => key === data.name);
      let px = pxFind;
      let py = 1;

      const findePos = (x, y) => {
        x += 0.8;
        y -= 0.5;
        this.px = this.ax * x;
        this.py = Math.abs(this.ay * y - this.ch) - this.fontSize / 3;
      };

      function isInt(n) {
        return n % 1 === 0;
      }

      if (!isInt(dataVal)) {
        const n = dataVal.toFixed(2).toString().split('.');

        const numOfPart = parseInt(n[0]);
        let decrease = parseInt(n[1]);

        if (decrease > 9) {
          let separated = decrease.toString();
          separated = separated.split('');
          let [first, ...rest] = separated;
          rest = rest.join('');
          finalRes = `${first}.${rest}`;
          finalRes = parseFloat(finalRes);

          let reverse = finalRes;
          reverse = finalRes.toString();
          reverse = reverse.split('.');
          reverse = parseInt(reverse[1] || reverse[0]);
          reverse = reverse * 9;
          reverse = reverse.toString();
          reverse = reverse.split('');
          reverse = parseInt(reverse[1] || reverse[0]);

          decrease = reverse;
        } else {
          let reverse = decrease * 9;
          reverse = reverse.toString();
          reverse = reverse.split('');
          reverse = parseInt(reverse[1] || reverse[0]);
          decrease = reverse;
        }

        for (let i = 0; i <= numOfParts; i++) {
          findePos(px, py);

          if (i === numOfPart) {
            ctx.beginPath();
            ctx.moveTo(this.px, this.py - 10);
            ctx.lineTo(
              this.px,
              this.py - this.ay + ((this.ay - 10) / 9) * decrease
            );
            ctx.lineWidth = '15';
            ctx.strokeStyle = this.colors[i];
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.closePath();
          } else {
            ctx.beginPath();
            ctx.moveTo(this.px, this.py - 10);
            ctx.lineTo(this.px, this.py - this.ay + 10);
            ctx.lineWidth = '15';
            ctx.strokeStyle = this.colors[i];
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.closePath();
          }

          py += 1;
        }
      } else {
        for (let i = 0; i <= numOfParts - 1; i++) {
          findePos(px, py);
          ctx.beginPath();
          ctx.moveTo(this.px, this.py - 10);
          ctx.lineTo(this.px, this.py - this.ay + 10);
          ctx.lineWidth = '15';
          ctx.strokeStyle = this.colors[i];
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.closePath();

          py += 1;
        }
      }
    }
  }

  // bar chart
  function bupdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chart = new BarChart();
    chart.drawChart();
  }
  bupdate();
}
// each person chart
export function epChart(data, config) {
  let resWidth;
  let resHeight;
  if (window.innerWidth < 760) {
    resWidth = 1.56;
    resHeight = 1.56;
  } else {
    resWidth = 3.3;
    resHeight = 3.3;
  }

  // create canvas and constructor
  const html = `
      <h2 style="text-align: center" >${config.title}</h2>
      <div class="point-value" id="${config.pointValueId}"></div>
      <div class="canvas-size" id="${config.cnavasSizeId}">
        <canvas class="canvas" id="${config.canvasId}"></canvas>
      </div>
      <div class="labels" id="${config.labelsId}"></div>
    `;
  const div = document.createElement('div');
  div.className = `chart ${config.containerClass}`;
  div.innerHTML = html;
  document.querySelector('.charts-container').appendChild(div);

  // responsiveness
  window.addEventListener('resize', () => {
    if (window.innerWidth < 760) {
      resWidth = 1.56;
      resHeight = 1.56;
    } else {
      resWidth = 3;
      resHeight = 3;
    }

    canvas.width =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resWidth;

    canvas.height =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resHeight;

    epUpdate(false);
  });

  let epAddPoints, epUpdate, epOutChart;

  // each person chart setup
  const canvas = document.getElementById(`${config.canvasId}`);
  const ctx = canvas.getContext('2d');

  canvas.width =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resWidth;

  canvas.height =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resHeight;

  // Each Person Chart
  class EpChart {
    constructor(f, hover) {
      // hover
      this.hov = hover;
      // font size
      this.fontSize = f;
      // y axis
      this.ay = canvas.height / 4.2;
      // x axis
      this.ax = canvas.width / 4.2;
      this.cw = canvas.width;
      this.ch = canvas.height;
      // animation speed
      this.dx = 3;
      this.dy = 2;
      // point axises
      this.startPX = 20;
      this.startPy = 0;
      this.px = undefined;
      this.py = undefined;
      // create line funciton
      this.drawLine = null;
      // points for hover
      this.count = 0;
      this.pers = [];
      // each person position data
      this.positions = [];
      this.tempValuesData = [];
      this.valuesData = [];
      // colors
      this.father = '#7b72db';
      this.mother = '#79d2de';
      this.girl = '#eccd66';
      this.son = '#ee8a48';
      // sons and doughters
      this.sons = [
        'first-son',
        'second-son',
        'third-son',
        'fourth-son',
        'fifth-son',
      ];
      this.doughters = [
        'first-daughter',
        'second-daughter',
        'third-daughter',
        'fourth-daughter',
        'fifth-daughter',
      ];
    }

    roleFinder(item) {
      let rl;
      let res;
      if (item) {
        rl = item.split('-');
        rl = rl[0].trim();

        if (rl === 'دختر') {
          res = 'daughter';
        }
        if (rl === 'مادر') {
          res = 'mother';
        }
        if (rl === 'پدر') {
          res = 'father';
        }
        if (rl === 'پسر') {
          res = 'son';
        }
        if (rl === 'family') {
          res = 'family';
        }
      }

      return res;
    }

    drawChart() {
      // middle line X axis
      ctx.beginPath();
      ctx.globalCompositeOperation = 'xor';
      ctx.moveTo(0, this.ay * 2.2 - this.fontSize / 3);
      ctx.lineTo(this.cw, this.ay * 2.2 - this.fontSize / 3);
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();
      // middle line Y axis
      ctx.beginPath();
      ctx.globalCompositeOperation = 'xor';
      ctx.moveTo(this.ax * 2 + this.fontSize / 3, 0);
      ctx.lineTo(this.ax * 2 + this.fontSize / 3, this.ch);
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.ax * 2 + this.fontSize / 3, 0);
      ctx.font = `16px Arial`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // text: right-bottom
      ctx.fillText(
        `دارای مشکل`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3 - 10
      );
      ctx.fillText(
        `محتوایی`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3 + 10
      );
      // text: left-bottom
      ctx.fillText(
        `ناکارآمد`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3
      );
      // text: left-top
      ctx.fillText(
        `دارای مشکل`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3 - 10
      );
      ctx.fillText(
        `فرایندی`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3 + 10
      );
      // text: right-top
      ctx.fillText(
        `کارآمد`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3
      );
      ctx.stroke();
      ctx.closePath();
    }

    addPoint(x, y, role) {
      this.tempValuesData.push({ role: role, x: x, y: y });
      x -= 1;
      y -= 1;
      this.px = this.ax * x + this.fontSize / 3;
      this.py = Math.abs(this.ay * y - this.ch) - this.fontSize / 3;

      this.positions.push({
        x: this.px,
        y: this.py,
      });

      let rl = role.split('-');
      rl = rl[0].trim();

      if (rl === 'دختر') {
        const girl = new Path2D();
        ctx.beginPath();
        girl.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
        ctx.moveTo(this.px, this.py);
        if (this.hov === role) {
          ctx.arc(this.px, this.py, 10, 0, Math.PI * 2, false);
          ctx.fillStyle = this.girl;
        } else {
          ctx.arc(this.px, this.py, 6, 0, Math.PI * 2, false);
          ctx.fillStyle = '#ccc';
        }
        ctx.fillStyle = this.girl;
        ctx.fill();
        ctx.closePath();
        this.pers.push({ name: role, path: girl });
      }
      if (rl === 'مادر') {
        const mother = new Path2D();
        ctx.beginPath();
        mother.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
        if (this.hov === role) {
          ctx.lineTo(this.px, this.py - 12);
          ctx.moveTo(this.px, this.py - 12);
          ctx.lineTo(this.px - 10, this.py + 5);
          ctx.lineTo(this.px + 10, this.py + 5);
          ctx.lineTo(this.px, this.py - 12);
          ctx.fillStyle = this.mother;
        } else {
          ctx.lineTo(this.px, this.py - 8);
          ctx.moveTo(this.px, this.py - 8);
          ctx.lineTo(this.px - 7, this.py + 5);
          ctx.lineTo(this.px + 7, this.py + 5);
          ctx.lineTo(this.px, this.py - 8);
          ctx.fillStyle = '#ccc';
        }
        ctx.fillStyle = this.mother;
        ctx.fill();
        ctx.closePath();
        this.pers.push({ name: role, path: mother });
      }
      if (rl === 'پدر') {
        const father = new Path2D();
        ctx.beginPath();
        ctx.moveTo(this.px - 5, this.py - 5);
        father.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
        if (this.hov === role) {
          ctx.rect(this.px - 7, this.py - 7, 15, 15);
          ctx.fillStyle = this.father;
        } else {
          ctx.rect(this.px - 5, this.py - 5, 10, 10);
          ctx.fillStyle = '#ccc';
        }
        ctx.fillStyle = this.father;
        ctx.fill();
        ctx.closePath();
        this.pers.push({ name: role, path: father });
      }
      if (rl === 'پسر') {
        const son = new Path2D();
        ctx.beginPath();
        son.arc(this.px, this.py, 15, 0, Math.PI * 2, false);

        for (let i = 0; i < this.sons.length; i++) {
          if (this.hov === role) {
            ctx.moveTo(this.px, this.py - 11);
            ctx.lineTo(this.px - 20 / 2, this.py + 15 / 2 - 7);
            ctx.lineTo(this.px, this.py + 20 - 7);
            ctx.lineTo(this.px + 20 / 2, this.py + 15 / 2 - 7);
            ctx.fillStyle = this.son;
          } else {
            ctx.moveTo(this.px, this.py - 7);
            ctx.lineTo(this.px - 15 / 2, this.py + 15 / 2 - 7);
            ctx.lineTo(this.px, this.py + 15 - 7);
            ctx.lineTo(this.px + 15 / 2, this.py + 15 / 2 - 7);
            ctx.fillStyle = '#ccc';
          }
        }
        ctx.fillStyle = this.son;
        ctx.fill();
        ctx.closePath();
        this.pers.push({ name: role, path: son });
      }
    }

    filterLabelData() {
      this.valuesData = [];
      if (this.tempValuesData.length > 10) {
        for (let i = 0; i < this.tempValuesData.length / 2; i++) {
          this.valuesData.push(this.tempValuesData[i]);
        }
      } else {
        for (let i = 0; i < this.tempValuesData.length; i++) {
          this.valuesData.push(this.tempValuesData[i]);
        }
      }
    }

    pointConnect() {
      let grahamNeed = [];

      this.positions.map((item) => {
        grahamNeed.push([item.x, item.y]);
      });

      const graham = new GrahamScan();
      graham.setPoints(grahamNeed);
      grahamNeed = graham.getHull();

      ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      ctx.moveTo(grahamNeed[0][0], grahamNeed[0][1]);
      grahamNeed.forEach((item) => {
        ctx.lineTo(item[0], item[1]);
      });
      ctx.lineTo(grahamNeed[0][0], grahamNeed[0][1]);
      ctx.fillStyle = 'rgba(95, 158, 160, 0.3)';
      ctx.fill();
      ctx.closePath();
    }

    displayLabels() {
      let html = ``;

      let labels1 = [];
      let labels2 = [];
      let merg = [];
      labels1 = Array(data['children']);
      labels2 = Array(data['parents']);

      labels2[0].forEach((item) => {
        merg.push(item);
      });
      labels1[0].forEach((item) => {
        merg.push(item);
      });

      let peoples = merg;

      peoples.forEach((item) => {
        html += `
        <div class="s ${this.roleFinder(item.role)}">
          <span data-before="${item.role}" class="s ${this.roleFinder(
          item.role
        )}" style="color: gray"></span>
          <img class="s ${this.roleFinder(
            item.role
          )}" src="/images/${this.roleFinder(item.role)}.svg" alt="">
        </div>
      `;
      });
      document.getElementById(`${config.labelsId}`).innerHTML = html;
    }

    hover() {
      function inUpdate(hov) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const eChart = new EpChart(16, hov);
        epOutChart = eChart;
        eChart.drawChart();
        epAddPoints();
        eChart.pointConnect();
      }

      canvas.addEventListener('mousemove', (e) => {
        let mouse = this.mousePos(e);

        this.pers.forEach((item) => {
          if (!ctx.isPointInPath(item.path, mouse.x, mouse.y)) {
            document.getElementById(`${config.pointValueId}`).style.opacity =
              '0';
            document.getElementById(`${config.pointValueId}`).innerHTML = '';

            document
              .getElementById(`${config.labelsId}`)
              .querySelector(`[data-before="${item.name}"]`)
              .classList.remove('hov');

            inUpdate(false);
          }
        });

        this.pers.forEach((item) => {
          if (ctx.isPointInPath(item.path, mouse.x, mouse.y)) {
            let role = this.valuesData.find((rol) => {
              return rol.role === item.name;
            });

            let html = `
            <span>process: ${role.x}</span>
            <span>content: ${role.y}</span>
          `;
            document.getElementById(`${config.pointValueId}`).innerHTML = html;
            document.getElementById(`${config.pointValueId}`).style.opacity =
              '1';

            if (document.querySelector(`.s`)) {
              document.querySelectorAll(`.s`).forEach((item) => {
                item.classList.remove('hov');
              });
            }

            document
              .getElementById(`${config.labelsId}`)
              .querySelector(`[data-before="${item.name}"]`)
              .classList.add('hov');
          }
        });
      });
    }

    labelHover() {
      function inUpdate(hov) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const eChart = new EpChart(16, hov);
        epOutChart = eChart;
        eChart.drawChart();
        epAddPoints();
        eChart.pointConnect();
      }

      document
        .getElementById(`${config.labelsId}`)
        .addEventListener('click', (e) => {
          pointHover(e);
        });
      let thi = this;
      const pointHover = function (e) {
        if (!e.target.classList.contains('s')) {
          inUpdate(false);
          // show value and label hover
          document.getElementById(`${config.pointValueId}`).style.opacity = '0';
          document.getElementById(`${config.pointValueId}`).innerHTML = '';
          document.querySelectorAll('.s').forEach((item) => {
            item.classList.remove('hov');
          });
        }

        if (e.target.classList.contains('s')) {
          let targetClass = e.target.getAttribute('data-before');
          let role = thi.valuesData.find((rol) => {
            return rol.role === targetClass;
          });
          // points hover effect
          let html = '';
          if (role) {
            html = `
              <span>process: ${role.x}</span>
              <span>content: ${role.y}</span>
              `;
            document.getElementById(`${config.pointValueId}`).innerHTML = html;
            document.getElementById(`${config.pointValueId}`).style.opacity =
              '1';
            inUpdate(role.role);

            if (document.querySelector(`.s`)) {
              document.querySelectorAll(`.s`).forEach((item) => {
                item.classList.remove('hov');
              });
            }

            document
              .getElementById(`${config.labelsId}`)
              .querySelector(`[data-before="${role.role}"]`)
              .classList.add('hov');

            thi.shadowGiver(role.role);
          }
        }
      };

      window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('s')) {
          // show value and label hover
          document.getElementById(`${config.pointValueId}`).style.opacity = '0';
          document.getElementById(`${config.pointValueId}`).innerHTML = '';
          document.querySelectorAll('.s').forEach((item) => {
            item.classList.remove('hov');
          });

          inUpdate(false);
        }
      });
    }

    mousePos(e) {
      let ClientRect = canvas.getBoundingClientRect();
      return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top),
      };
    }

    shadowGiver(role) {
      const colors = [
        {
          rol: 'family',
          color: '#9ad6c0',
        },
        {
          rol: 'father',
          color: '#9c97cc',
        },
        {
          rol: 'mother',
          color: '#9dbdc2',
        },
        {
          rol: 'son',
          color: '#d4b9a7',
        },
        {
          rol: 'daughter',
          color: '#dbcfa4',
        },
      ];

      let currRole = colors.filter((item) => {
        if (item.rol === role) {
          return item;
        } else if (item.rol === this.roleFinder(role)) {
          return item;
        }
      });

      let all = document
        .getElementById(`${config.labelsId}`)
        .querySelectorAll(`div`);

      all.forEach((item) => {
        item.style.boxShadow = 'none';
      });

      const el = document
        .getElementById(`${config.labelsId}`)
        .querySelector(`[data-before="${role}"]`);

      if (el) {
        el.parentElement.style.boxShadow = `inset -21px 21px 24px ${currRole[0].color}, inset 21px -21px 24px #a8a3d83d`;
      } else {
        document
          .getElementById(`${config.labelsId}`)
          .querySelector(
            `.${role}`
          ).style.boxShadow = `inset -21px 21px 24px ${currRole[0].color}, inset 21px -21px 24px #a8a3d83d`;
      }
    }
  }

  // Graham scan
  const X = 0;
  const Y = 1;
  const REMOVED = -1;

  class GrahamScan {
    constructor() {
      this.points = [];
    }

    setPoints(points) {
      this.points = points.slice();
    }
    getHull() {
      const pivot = this.preparePivotPoint();
      let indexes = Array.from(this.points, (point, i) => i);
      const angles = Array.from(this.points, (point) =>
        this.getAngle(pivot, point)
      );
      const distances = Array.from(this.points, (point) =>
        this.euclideanDistanceSquared(pivot, point)
      );

      indexes.sort((i, j) => {
        const angleA = angles[i];
        const angleB = angles[j];
        if (angleA === angleB) {
          const distanceA = distances[i];
          const distanceB = distances[j];
          return distanceA - distanceB;
        }
        return angleA - angleB;
      });

      for (let i = 1; i < indexes.length - 1; i++) {
        if (angles[indexes[i]] === angles[indexes[i + 1]]) {
          indexes[i] = REMOVED;
        }
      }

      const hull = [];
      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const point = this.points[index];

        if (index !== REMOVED) {
          if (hull.length < 3) {
            hull.push(point);
          } else {
            while (
              this.checkOrientation(
                hull[hull.length - 2],
                hull[hull.length - 1],
                point
              ) > 0
            ) {
              hull.pop();
            }
            hull.push(point);
          }
        }
      }

      return hull.length < 3 ? [] : hull;
    }
    checkOrientation(p1, p2, p3) {
      return (
        (p2[Y] - p1[Y]) * (p3[X] - p2[X]) - (p3[Y] - p2[Y]) * (p2[X] - p1[X])
      );
    }

    getAngle(a, b) {
      return Math.atan2(b[Y] - a[Y], b[X] - a[X]);
    }
    euclideanDistanceSquared(p1, p2) {
      const a = p2[X] - p1[X];
      const b = p2[Y] - p1[Y];
      return a * a + b * b;
    }
    preparePivotPoint() {
      let pivot = this.points[0];
      let pivotIndex = 0;
      for (let i = 1; i < this.points.length; i++) {
        const point = this.points[i];
        if (
          point[Y] < pivot[Y] ||
          (point[Y] === pivot[Y] && point[X] < pivot[X])
        ) {
          pivot = point;
          pivotIndex = i;
        }
      }
      return pivot;
    }
  }

  // each person chart
  epAddPoints = function () {
    let labels1 = [];
    let labels2 = [];
    let merg = [];
    labels1 = Array(data['children']);
    labels2 = Array(data['parents']);

    labels2[0].forEach((item) => {
      merg.push(item);
    });
    labels1[0].forEach((item) => {
      merg.push(item);
    });

    const peoples = merg;

    peoples.forEach((item) => {
      epOutChart.addPoint(
        item.results[0].content,
        item.results[0].process,
        item.role
      );
    });

    epOutChart.filterLabelData();
  };

  epUpdate = (scale) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const chart = new EpChart(16, scale);
    epOutChart = chart;
    chart.drawChart();
    epAddPoints();
    chart.hover();
    chart.labelHover();
    chart.pointConnect();
    chart.displayLabels();
    chart.shadowGiver('father');
  };
  epUpdate(false);
}
// family chart
export function familyChart(data, config) {
  let resWidth;
  let resHeight;
  if (window.innerWidth < 760) {
    resWidth = 1.56;
    resHeight = 1.56;
  } else {
    resWidth = 3;
    resHeight = 3;
  }

  // create canvas and constructor
  const html = `
      <h2 style="text-align: center" >${config.title}</h2>
      <div class="point-value" id="${config.pointValueId}"></div>
      <div class="canvas-size" id="${config.cnavasSizeId}">
        <canvas class="canvas" id="${config.canvasId}"></canvas>
      </div>
      <div class="labels" id="${config.labelsId}"></div>
    `;
  const div = document.createElement('div');
  div.className = `chart ${config.containerClass}`;
  div.innerHTML = html;
  document.querySelector('.charts-container').appendChild(div);

  // responsiveness
  window.addEventListener('resize', () => {
    if (window.innerWidth < 760) {
      resWidth = 1.56;
      resHeight = 1.56;
    } else {
      resWidth = 2.75;
      resHeight = 2.75;
    }

    canvas.width =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resWidth;

    canvas.height =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      resHeight;

    epUpdate(false);
  });

  let epAddPoints, epUpdate, epOutChart;

  // each person chart setup
  const canvas = document.getElementById(`${config.canvasId}`);
  const ctx = canvas.getContext('2d');

  canvas.width =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resWidth;

  canvas.height =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    resHeight;

  // Each Person Chart
  class EpChart {
    constructor(f, hover) {
      // hover
      this.hov = hover;
      // font size
      this.fontSize = f;
      // y axis
      this.ay = canvas.height / 4.15;
      // x axis
      this.ax = canvas.width / 4.15;
      this.cw = canvas.width;
      this.ch = canvas.height;
      // animation speed
      this.dx = 3;
      this.dy = 2;
      // point axises
      this.startPX = 20;
      this.startPy = 0;
      this.px = undefined;
      this.py = undefined;
      // create line funciton
      this.drawLine = null;
      // points for hover
      this.count = 0;
      this.pers = [];
      // each person position data
      this.positions = [];
      this.tempValuesData = [];
      this.valuesData = [];
      // colors
      this.family = '#14d6c9';
    }

    drawChart() {
      // middle line X axis
      ctx.beginPath();
      ctx.moveTo(0, this.ay * 2.15 - this.fontSize / 3);
      ctx.lineTo(this.cw, this.ay * 2.15 - this.fontSize / 3);
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();
      // middle line Y axis
      ctx.beginPath();
      ctx.moveTo(this.ax * 2 + this.fontSize / 3, 0);
      ctx.lineTo(this.ax * 2 + this.fontSize / 3, this.ch);
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.ax * 2 + this.fontSize / 3, 0);
      ctx.font = `16px Arial`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // text: right-bottom
      ctx.fillText(
        `دارای مشکل`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3 - 10
      );
      ctx.fillText(
        `محتوایی`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3 + 10
      );
      // text: left-bottom
      ctx.fillText(
        `ناکارآمد`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 3.15 - this.fontSize / 3
      );
      // text: left-top
      ctx.fillText(
        `دارای مشکل`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3 - 10
      );
      ctx.fillText(
        `فرایندی`,
        this.ax * 1 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3 + 10
      );
      // text: right-top
      ctx.fillText(
        `کارآمد`,
        this.ax * 3 + this.fontSize / 3,
        this.ay * 1.15 - this.fontSize / 3
      );
      ctx.stroke();
      ctx.closePath();
    }

    addPoint(x, y, role) {
      this.tempValuesData.push({ role: role, x: x, y: y });
      x -= 1;
      y -= 1;
      this.px = this.ax * x + this.fontSize / 3;
      this.py = Math.abs(this.ay * y - this.ch) - this.fontSize / 3;

      this.positions.push({
        x: this.px,
        y: this.py,
      });

      if (role === 'family') {
        const family = new Path2D();
        ctx.beginPath();
        ctx.moveTo(this.px - 5, this.py - 5);
        family.arc(this.px, this.py, 15, 0, Math.PI * 2, false);
        if (this.hov) {
          if (role === 'family') {
            ctx.beginPath();
            this.drawStar(this.px, this.py, 6, 6, 4);
            ctx.strokeStyle = this.family;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
          }
        } else {
          ctx.beginPath();
          this.drawStar(this.px, this.py, 6, 6, 4);
          ctx.strokeStyle = this.family;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
        ctx.fillStyle = this.family;
        ctx.fill();
        ctx.closePath();
        this.pers.push({ name: role, path: family });
      }
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    }

    filterLabelData() {
      this.valuesData = [];
      if (this.tempValuesData.length > 10) {
        for (let i = 0; i < this.tempValuesData.length / 2; i++) {
          this.valuesData.push(this.tempValuesData[i]);
        }
      } else {
        for (let i = 0; i < this.tempValuesData.length; i++) {
          this.valuesData.push(this.tempValuesData[i]);
        }
      }
    }

    pointConnect() {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.beginPath();
      ctx.moveTo(this.positions[0].x, this.positions[0].y);
      this.positions.forEach((item, index) => {
        ctx.lineTo(this.positions[index].x, this.positions[index].y);
      });
      ctx.lineTo(this.positions[0].x, this.positions[0].y);
      ctx.fillStyle = 'rgba(95, 158, 160, 0.3)';
      ctx.fill();
      ctx.closePath();
    }

    displayLabels() {
      let html = ``;
      this.valuesData.forEach((item) => {
        html += `
        <div class="s ${item.role}">
          <span class="s ${item.role}" style="color: gray"></span>
          <img class="s ${item.role}" src="/images/${item.role}.svg" alt="">
        </div>
      `;
      });
      document.getElementById(`${config.labelsId}`).innerHTML = html;
    }

    hover() {
      function inUpdate(hov) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const eChart = new EpChart(16, hov);
        epOutChart = eChart;
        eChart.drawChart();
        epAddPoints();
        eChart.pointConnect();
      }
      canvas.addEventListener('mousemove', (e) => {
        let mouse = this.mousePos(e);

        this.pers.forEach((item) => {
          if (!ctx.isPointInPath(item.path, mouse.x, mouse.y)) {
            document.getElementById(`${config.pointValueId}`).style.opacity =
              '0';
            document.getElementById(`${config.pointValueId}`).innerHTML = '';

            document
              .querySelector(`#${config.labelsId} .s.${item.name}`)
              .classList.remove('hov');

            inUpdate(false);
          }
        });

        this.pers.forEach((item, index) => {
          if (ctx.isPointInPath(item.path, mouse.x, mouse.y)) {
            let role = this.valuesData.find((rol) => {
              return rol.role === item.name;
            });

            let html = `
            <span>process: ${role.x}</span>
            <span>content: ${role.y}</span>
          `;
            document.getElementById(`${config.pointValueId}`).innerHTML = html;
            document.getElementById(`${config.pointValueId}`).style.opacity =
              '1';

            if (document.querySelector(`.s`)) {
              document.querySelectorAll(`.s`).forEach((item) => {
                item.classList.remove('hov');
              });
            }

            document
              .querySelector(`#${config.labelsId} .s.${item.name}`)
              .classList.add('hov');
          }
        });
      });
    }

    labelHover() {
      function inUpdate(hov) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const eChart = new EpChart(16, hov);
        epOutChart = eChart;
        eChart.drawChart();
        epAddPoints();
        eChart.pointConnect();
      }

      document
        .getElementById(`${config.labelsId}`)
        .addEventListener('click', (e) => {
          pointHover(e);
        });
      let thi = this;
      const pointHover = function (e) {
        if (!e.target.classList.contains('s')) {
          inUpdate(false);
          // show value and label hover
          document.getElementById(`${config.pointValueId}`).style.opacity = '0';
          document.getElementById(`${config.pointValueId}`).innerHTML = '';
          document.querySelectorAll('.s').forEach((item) => {
            item.classList.remove('hov');
          });
        }

        if (e.target.classList.contains('s')) {
          let targetClass = e.target.classList[1];
          let role = thi.valuesData.find((rol) => {
            return rol.role === targetClass;
          });
          // points hover effect
          let html = `
        <span>process: ${role.x}</span>
        <span>content: ${role.y}</span>
        `;
          document.getElementById(`${config.pointValueId}`).innerHTML = html;
          document.getElementById(`${config.pointValueId}`).style.opacity = '1';
          inUpdate(role.role);

          if (document.querySelector(`.s`)) {
            document.querySelectorAll(`.s`).forEach((item) => {
              item.classList.remove('hov');
            });
          }

          document
            .querySelector(`#${config.labelsId} .s.${role.role}`)
            .classList.add('hov');
        }
      };

      window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('s')) {
          // show value and label hover
          document.getElementById(`${config.pointValueId}`).style.opacity = '0';
          document.getElementById(`${config.pointValueId}`).innerHTML = '';
          document.querySelectorAll('.s').forEach((item) => {
            item.classList.remove('hov');
          });

          inUpdate(false);
        }
      });
    }

    mousePos(e) {
      let ClientRect = canvas.getBoundingClientRect();
      return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top),
      };
    }
  }

  // each person chart
  epAddPoints = function () {
    let labels1 = [];
    let labels2 = [];
    let merg = [];
    labels1 = Array(data['children']);
    labels2 = Array(data['parents']);

    labels2[0].forEach((item) => {
      merg.push(item.results[0]);
    });
    labels1[0].forEach((item) => {
      merg.push(item.results[0]);
    });

    // content
    let res = merg.map((item) => {
      return parseFloat(item.content);
    });
    res = res.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });

    // process
    let resProcess = merg.map((item) => {
      return parseFloat(item.process);
    });
    resProcess = resProcess.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });

    let content = res / merg.length;
    let process = resProcess / merg.length;

    epOutChart.addPoint(content, process, 'family');
    epOutChart.filterLabelData();
  };
  epUpdate = (scale) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const eChart = new EpChart(16, scale);
    epOutChart = eChart;
    eChart.drawChart();
    epAddPoints();
    eChart.hover();
    eChart.labelHover();
    eChart.pointConnect();
    eChart.displayLabels();
  };
  epUpdate(false);
}
