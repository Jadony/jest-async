import { getData1, getData2 } from './getData';

// 回调类型的异步函数测试
// 异步调用回调函数需要添加 done 参数，是一个函数
// test('getData 返回结果为 { success: true }', (done) => {
//   // 此处代码无效，因为测试用例不会等待请求结束后的回调，测试用例执行完就直接结束了
//   getData1((data) => {
//     expect(data).toEqual({
//       success: true
//     })
//   })
  
//   // getData1((data) => {
//   //   expect(data).toEqual({
//   //     success: true
//   //   })
//   //   // 需要在结束前调用 done 函数，jest会知道到 done 才会结束，才可以正确测试异步函数
//   //   done();
//   // })
// })

// 测试无回调函数成功情况
test('getData 返回结果为 { success: true }', () => {
  // 使用 promise 时需要return，在 then 中使用 done 也可以
  return getData2().then(res => {
    expect(res.data).toEqual({
      success: true
    })
  })
})
// 测试无回调失败情况
test('getData 返回结果为 404', () => {
  // 由于不触发 catch 就不会走测试校验，所以会成功，我们需要做一下限制
  // 这行代码限制下面的代码中必须要执行一次 expect 方法，如果非404就不会走下面的expect，则测试不会通过
  expect.assertions(1);
  // 使用 promise 时需要return
  // 如果只想测试404这样写是有问题的，需要配合assertions使用
  return getData2().catch(err => {
    expect(err.toString().indexOf('404') > -1).toBe(true)
  })
})

// 对于返回 promise 对象其他的测试用例书写方法
test('getData 返回结果为 { success: true }', () => {
  // 会返回很多数据，其中包含 data 对象
  // getData2().then((res) => console.log(res))
  // {
  //   status: 200,
  //   statusText: 'OK',
  //   headers: {},
  //   ......
  //   data: { success: true }
  // }
  // resolves 方法会将接口返回的字段全部获取，再使用 toMatchObject 方法进行匹配大对象中是否存在 data 对象
  return expect(getData2()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})
// test('getData 返回结果为 404', () => {
//   // rejects 方法判断请求失败并报错，再使用 toThrow 方法将 rejects 的 error 进行抛出
//   return expect(getData2()).rejects.toThrow()
// })

// 还可以使用 async/await
test('getData 返回结果为 { success: true }', async () => {
  // resolves 方法会将接口返回的字段全部获取，再使用 toMatchObject 方法进行匹配大对象中是否存在 data 对象
  await expect(getData2()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})
// test('getData 返回结果为 404', async () => {
//   // rejects 方法判断请求失败并报错，再使用 toThrow 方法将 rejects 的 error 进行抛出
//   await expect(getData2()).rejects.toThrow()
// })

// 另一种写法
// test('getData 返回结果为 { success: true }', async () => {
//   const res = await getData2();
//   expect(res.data).toEqual({
//     success: true
//   })
// })
// test('getData 返回结果为 404', async () => {
//   // 由于不触发 catch 就不会走测试校验，所以会成功，我们需要做一下限制
//   // 这行代码限制下面的代码中必须要执行一次 expect 方法，如果非404就不会走下面的expect，则测试不会通过
//   expect.assertions(1);
//   try {
//     const res = await getData2();
//     // res ......
//   } catch (error) {
//     // console.log(error);
//     // error 也是类似于 res 的一个大对象
//     // error.toString 是 toEqual 中的字符串
//     expect(error.toString()).toEqual('Error: Request failed with status code 404');
//   }
// })
// // 方法很多，用哪种都可以