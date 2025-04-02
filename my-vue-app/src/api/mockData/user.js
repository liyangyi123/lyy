import Mock from 'mockjs';

// 将 URL 参数解析为对象
function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

// 模拟用户数据列表
let List = [];
const count = 200; // 模拟 200 条用户数据

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(), // 唯一 ID
      name: Mock.Random.cname(), // 随机中文姓名
      addr: Mock.mock('@county(true)'), // 随机地址
      'age|18-60': 1, // 年龄范围 18-60
      birth: Mock.Random.date(), // 随机日期
      sex: Mock.Random.integer(0, 1), // 性别：0 或 1
    })
  );
}

// 导出 API 模拟接口
export default {
  /**
   * 获取用户列表
   * 支持参数 name, page, limit；name 可选，page 和 limit 有默认值
   * @param name, page, limit
   * @return {code: number, count: number, data: []}
   */
  getUserList: (config) => {
    
    // 默认分页参数
    const { name, page = 1, limit = 10 } = param2Obj(config.url);

    // 根据 name 筛选数据
    const mockList = List.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false; // 如果传入 name，则根据 name 模糊匹配
      return true;
    });

    // 分页
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      code: 200,
      data: {
        list: pageList, // 当前页数据
        count: mockList.length, // 总数据条数
      },
    };
  },
  /**
   * 删除用户
   * @param id 用户 ID
   * @return {code: number, message: string}
   */
  deleteUser: (config) => {
    const { id } = param2Obj(config.url); // 从 URL 中解析出 id 参数

    if (!id) {
      return {
        code: -999,
        message: '参数不正确',
      };
    } else {
      // 根据 ID 删除用户
      List = List.filter((user) => user.id !== id);
      return {
        code: 200,
        message: '删除成功',
      };
    }
  },
 /**
 * 增加用户
 * @param name, addr, age, birth, sex
 * @return {{code: number, data: {message: string}}}
 */
createUser: (config) => {
  const { name, addr, age, birth, sex } = JSON.parse(config.body);
  List.unshift({
    id: Mock.Random.guid(),
    name: name,
    addr: addr,
    age: age,
    birth: birth,
    sex: sex,
  });

  return {
    code: 200,
    data: {
      message: '添加成功',
    },
  };
},
/**
 * 修改用户
 * @param id, name, addr, age, birth, sex
 * @return {{code: number, data: {message: string}}}
 */
updateUser: (config) => {
  const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
  const sex_num = parseInt(sex); // 将性别转换为数字类型
  List.some((u) => {
    if (u.id === id) {
      u.name = name;
      u.addr = addr;
      u.age = age;
      u.birth = birth;
      u.sex = sex_num;
      return true;
    }
  });
  return {
    code: 200,
    data: {
      message: '修改成功',
    },
  };
},

};