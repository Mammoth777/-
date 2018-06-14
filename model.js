class Point {
  constructor(ctx, x, y, radius, color = '#fff') {
    radius = radius || parseInt(Math.random() * 4) + 3 // 默认半径3-7
    Object.assign(this, { ctx, x, y, radius, color })
    this.exist = true // 是否渲染
    this.breathProcessNum = 0
    /* setTimeout(() => {
      this.destroy()
    }, 2000); */
  }
  draw() {
    if (!this.exist) return
    const { ctx, x, y, radius, color, breathProcessNum } = this
    const tempRadius = this.breath(radius) // 计算临时半径
    ctx.beginPath()
    ctx.arc(x, y, tempRadius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }
  breath(radius) {
    this.breathProcessNum += Math.PI / 18
    let sinNum = Math.sin(this.breathProcessNum)
    sinNum = (sinNum * 2.5).toFixed(2) * 1
    radius += sinNum
    radius = radius.toFixed(2)*1
    // console.log({sinNum, r: radius});
    return radius
  }
  destroy() {
    console.log('destory');
    this.x = -1
    this.y = -1
    this.draw()
    this.exist = false
  }
}

// 继承array, 存放并观察列表
class PointList extends Array {
  constructor(...args) {
    super(...args)
    console.log(this);
  }
  beforeListChange() {
    console.log('before change');
  }
  afterListChange() {
    console.log(this, 'after change');
    // 在列表改变后计算连线
  }
  push(...args) {
    this.beforeListChange()
    const result = super.push(...args)
    this.afterListChange()
    return result
  }

}

// 场景
class Scene {
  constructor(ctx, width, height) {
    // 存放point 实例的数组
    this.list = new PointList()
    Object.assign(this, {ctx, width, height})
  }
  draw() {
    const {ctx, width, height} = this
    // console.log(width, height);
    const list = this.list
    ctx.clearRect(0, 0, width, height);
    list.forEach(ele => ele.draw())
  }
  addPoint(point) {
    if (point instanceof Point) {
      this.list.push(point)
    } else {
      throw new Error('point err')
    }
  }
}
