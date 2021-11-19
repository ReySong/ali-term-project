var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};

    var option;

    let currentScore = 0; //动态变化修改的分数
    
    window.onload=function(){
      let obtn=document.getElementById("add");
      obtn.onclick=function(){
        currentScore=currentScore+1;
      };

    }
    

    const treeDataURI =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC';
    const minScore = 0;
    const maxScore = 100;
    const lineCount = 5;
    // Basic option:
    option = {
      color: ['#e54035'],
      xAxis: {
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        name: minScore + '',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: 'green',
          fontSize: 30,
          fontFamily: 'Arial'
        },
        min: -2800,
        max: 2800
      },
      yAxis: {
        data: makeCategoryData(),
        show: false
      },
      grid: {
        top: 'center',
        height: 150
      },
      series: [{
          name: 'all',
          type: 'pictorialBar',
          symbol: 'image://' + treeDataURI,
          symbolSize: [30, 55],
          symbolRepeat: true,
          data: makeSeriesData(minScore),
          animationEasing: 'elasticOut'
        },
        {
          name: 'all',
          type: 'pictorialBar',
          symbol: 'image://' + treeDataURI,
          symbolSize: [30, 55],
          symbolRepeat: true,
          data: makeSeriesData(minScore, true),
          animationEasing: 'elasticOut'
        }
      ]
    };
    // 制造假数据。
    function makeCategoryData() {
      var categoryData = [];
      for (var i = 0; i < lineCount; i++) {
        categoryData.push(i + 'a');
      }
      return categoryData;
    }

    function makeSeriesData(score, negative) {
      // 为演示制作一个假值。
      const r = (score - minScore + 1) * 10;
      const seriesData = [];
      for (let i = 0; i < lineCount; i++) {
        let sign = negative ? -1 * (i % 3 ? 0.9 : 1) : 1 * ((i + 1) % 3 ? 0.9 : 1);
        seriesData.push({
          value: sign *
            (score <= minScore + 1 ?
              Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5 ?
              5 :
              0 :
              (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
          symbolOffset: i % 2 ? ['50%', 0] : undefined
        });
      }
      return seriesData;
    }
    //设置动态数据。
    setInterval(function () {
      if (currentScore > maxScore) {
        currentScore = minScore;
      }
      myChart.setOption({
        xAxis: {
          name: currentScore
        },
        series: [{
            data: makeSeriesData(currentScore)
          },
          {
            data: makeSeriesData(currentScore, true)
          }
        ]
      });
    }, 800);

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }