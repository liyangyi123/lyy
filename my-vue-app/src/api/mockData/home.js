//模拟获取首页数据
const getHomeData = () => {
  return {
    code: 200,
    message: '获取首页数据成功',
    data: {
        tableData : [
            {
              name: 'Vue 3 入门',
              todaySales: 100,
              monthSales: 1000,
              totalSales: 10000,
            },
            {
              name: 'React 入门',
              todaySales: 200,
              monthSales: 2000, 
              totalSales: 20000,
            },
            {
              name: 'Angular 入门',
              todaySales: 300,
              monthSales: 3000, 
              totalSales: 30000,
            },
            {
                name: 'Svelte 入门',
                todaySales: 150,
                monthSales: 1500,
                totalSales: 15000,
              },
          ]
    },      
  }
};

// 模拟支付接口，包括今日支付订单，今日收藏订单，今日未支付订单，本月支付订单，本月收藏订单，本月未支付订单，每个订单包括name，value，icon，color
const getCountData = () => {
  return {
    code: 200,
    message: '获取支付数据成功',
    data: {
        countData : [
            {
              name: '今日支付订单',
              value: 100,
              icon: 'Money',
              color: '#ff6f5e',
            },
            {
              name: '今日收藏订单',
              value: 200,
              icon: 'Goods',
              color: '#5e9cff',
            },
            {
              name: '今日未支付订单',
              value: 300,
              icon: 'Money',
              color: '#5e9cff',
            },
            {
              name: '本月支付订单',
              value: 1500,
              icon: 'Document',
              color: '#ff6f5e',
            },
            {
              name: '本月收藏订单',
              value: 2500,
              icon: 'Goods',
              color: '#5e9cff',
            },
            {
              name: '本月未支付订单',
              value: 3500,
              icon: 'Money',
              color: '#5e9cff',
            },
          ]
    },      
  }
};

const getChartData = () => {
  return {
    code: 200,
    data: {
      orderData: {
        date: [
          "2025-03-21",
          "2025-03-22",
          "2025-03-23",
          "2025-03-24",
          "2025-03-25",
          "2025-03-26",
          "2025-03-27",
        ],
        data: [
          {
            苹果: 2004,
            小米: 1864,
            华为: 1395,
            oppo: 1315,
            vivo: 4051,
            一加: 2293,
          },
          {
            苹果: 2100,
            小米: 1900,
            华为: 1500,
            oppo: 1400,
            vivo: 4100,
            一加: 2300,
          },
          {
            苹果: 2200,
            小米: 1950,
            华为: 1600,
            oppo: 1450,
            vivo: 4200,
            一加: 2400,
          },
          {
            苹果: 2300,
            小米: 2000,
            华为: 1700,
            oppo: 1500,
            vivo: 4300,
            一加: 2500,
          },
          {
            苹果: 2400,
            小米: 2050,
            华为: 1800,
            oppo: 1550,
            vivo: 4400,
            一加: 2600,
          },
          {
            苹果: 2500,
            小米: 2100,
            华为: 1900,
            oppo: 1600,
            vivo: 4500,
            一加: 2700,
          },
          {
            苹果: 2600,
            小米: 2150,
            华为: 2000,
            oppo: 1650,
            vivo: 4600,
            一加: 2800,
          },
        ],
      },
      videoData: [
        { name: "小米", value: 2999 },
        { name: "苹果", value: 3999 },
        { name: "vivo", value: 1500 },
        { name: "oppo", value: 1999 },
        { name: "华为", value: 2200 },
        { name: "一加", value: 4500 },
      ],
      userData: [
        { date: "周一", new: 5, active: 200 },
        { date: "周二", new: 10, active: 500 },
        { date: "周三", new: 12, active: 550 },
        { date: "周四", new: 60, active: 800 },
        { date: "周五", new: 65, active: 770 },
        { date: "周六", new: 53, active: 770 },
        { date: "周日", new: 33, active: 170 },
      ],

    },
  };
};

export default {
  getHomeData,
  getCountData,
  getChartData, // 添加新方法到导出对象
};

