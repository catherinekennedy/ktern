import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
// import { EchartService } from 'src/app/common/service/echart.service';
import { ServiceService } from "src/app/service/service.service";
// import { EChartsOption } from 'echarts';
import * as echarts from "echarts";
// import $ from "jquery";

@Component({
  selector: "app-echart",
  templateUrl: "./echart.component.html",
  styleUrls: ["./echart.component.css"],
})
export class EchartComponent implements OnInit {
  // _chartOption: EChartsOption;
  subscription: Subscription;
  treesubscription: Subscription;
  // _theme: string;
  _isDarkmode: boolean = false;

  constructor(private echartService: ServiceService) {}

  ngOnInit(): void {
    this.subscription = this.echartService
      .getbasicSmoothedEchartData()
      .subscribe((data) => {
        console.log(data);

        this._initSmoothedEchart(data);
        this._echarttree(data);
      });
    // this.treesubscription = this.echartService
    //   .gettreedata()
    //   .subscribe((tree) => {
    //     console.log(tree);
    //     this._echarttree(tree);
    //   });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.treesubscription) {
      this.treesubscription.unsubscribe();
    }
  }
  darkmode() {
    // var myChart = echarts.init(chartDom, "dark");
  }

  _initSmoothedEchart(chartData: any) {
    // const options = ["A", "B", "C", "D"];
    // const values = [true, false, false, false];

    const res = [];
    for (let i = 0; i < chartData.budget2011List.length; i++) {
      res.push({
        value: chartData.budget2011List[i],
        name: chartData.names[i],
      });
    }

    console.log(res);
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById("main")!;
    if (this._isDarkmode) {
      var myChart = echarts.init(chartDom, "dark");
    } else {
      var myChart = echarts.init(chartDom);
    }

    var option: EChartsOption;

    option = {
      xAxis: {
        type: "category",
        data: chartData.names,
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: {
        top: "12%",
        left: "1%",
        right: "10%",
        containLabel: true,
      },
      title: {
        text: "sample",
      },

      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100,
        },
        {
          type: "inside",
          start: 94,
          end: 100,
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: "empty",
          width: 30,
          height: "80%",
          showDataShadow: false,
          left: "93%",
        },
      ],
      series: [
        {
          data: chartData.budget2011List,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
    option && myChart.setOption(option);

    //line chart : package installed :npm i echart

    var chartDomline = document.getElementById("line")!;
    if (this._isDarkmode) {
      var myChartline = echarts.init(chartDomline, "dark");
    } else {
      var myChartline = echarts.init(chartDomline);
    }

    var optionline: EChartsOption;

    optionline = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: 20,
        top: 600,
        bottom: 20,
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: res,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    optionline && myChartline.setOption(optionline);

    //code for heat map

    var chartDomheat = document.getElementById("heatmap")!;

    var myChartheat = echarts.init(chartDomheat);

    var optionheat: EChartsOption;

    // prettier-ignore
    const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
    // prettier-ignore
    const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
    // prettier-ignore
    const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
    optionheat = {
      tooltip: {
        position: "top",
      },
      grid: {
        height: "50%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: hours,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: days,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: "vertical",
        left: "center",
        bottom: "15%",
      },
      series: [
        {
          name: "Punch Card",
          type: "heatmap",
          data: data,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    optionheat && myChartheat.setOption(optionheat);

    //graph

    var chartDomgraph = document.getElementById("graph")!;

    var myChartgraph = echarts.init(chartDomgraph);

    var optiongraph: EChartsOption;

    const axisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const graphdata = axisData.map(function (item, i) {
      return Math.round(Math.random() * 1000 * (i + 1));
    });
    const links = graphdata.map(function (item, i) {
      return {
        source: i,
        target: i + 1,
      };
    });
    // links.pop();
    optiongraph = {
      title: {
        text: "Graph on Cartesian",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: axisData,
      },
      yAxis: {
        type: "value",
        data: graphdata,
      },
      series: [
        {
          type: "graph",
          layout: "none",
          coordinateSystem: "cartesian2d",
          symbolSize: 50,
          label: {
            show: true,
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [10, 20],
          data: graphdata,
          links: links,
          lineStyle: {
            color: "#2f4554",
          },
        },
      ],
    };
    myChartgraph.on("click", { dataType: "node" }, function (e) {
      alert(e.name);
      console.log(e);
      // When the nodes of the graph clicked, this method is called.
    });
    optiongraph && myChartgraph.setOption(optiongraph);

    // nb

    // this._theme = this._isDarkmode ? 'dark' : '';

    // this._chartOption = {

    //   tooltip: {
    //     show: true
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: chartData.map(m => ({
    //       value: m.name
    //     }))
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },

    //   series: [{
    //     data: chartData.map(m => ({
    //       value: m.value
    //     })),
    //     type: 'line',
    //     smooth: true
    //   }]

    // }
  }
  _echarttree(jsondata: any) {
    //tree
    type EChartsOption = echarts.EChartsOption;
    var chartDomtree = document.getElementById("tree")!;

    var myCharttree = echarts.init(chartDomtree);

    var optiontree: EChartsOption;

    // myCharttree.showLoading();
    optiontree = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
          data: [
            {
              name: "root",
              children: [
                {
                  name: "Child A",
                  children: [
                    {
                      name: "Leaf C",
                    },
                    {
                      name: "Leaf D",
                    },
                    {
                      name: "Leaf E",
                    },
                    {
                      name: "Leaf F",
                    },
                  ],
                },
                {
                  name: "Child B",
                  children: [
                    {
                      name: "Leaf G",
                    },
                    {
                      name: "Leaf H",
                    },
                  ],
                },
                {
                  name: "Child D",
                },
                {
                  name: "Child F",
                  children: [
                    {
                      name: "Leaf J",
                    },
                    {
                      name: "Leaf K",
                    },
                  ],
                },
              ],
            },
          ],
          top: "1%",
          left: "7%",
          bottom: "1%",
          right: "20%",
          symbolSize: 7,
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 9,
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };

    optiontree && myCharttree.setOption(optiontree);
  }
}
