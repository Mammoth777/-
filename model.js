const PI = 3
function calcDistance(point1, point2){
  let {p1, p2} = {point1, point2}
  
}

class Point {
  constructor(ctx, x, y, radius, color = '#fff') {
    radius = radius || parseInt(Math.random() * 4) + 3 // 默认半径3-7
    Object.assign(this, { ctx, x, y, radius, color })
    this.exist = true // 是否渲染
    this.breathProcessNum = 0
    this.nearby = []
  }
  draw() {
    if (!this.exist) return
    const { ctx, x, y, radius, color, breathProcessNum } = this
    const tempRadius = this.breath(radius) // 计算临时半径
    ctx.beginPath()
    ctx.arc(x, y, tempRadius, 0, PI * 2)
    // ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }
  breath(radius) {
    const range = forcePointRange || 5 // 呼吸幅度
    const speed = forcePointSpeed || 180 // 呼吸速度
    this.breathProcessNum += PI / speed
    let sinNum = Math.sin(this.breathProcessNum)
    radius += (sinNum * range).toFixed(2) * 1
    radius = Math.abs(radius.toFixed(2)*1)
    return radius
  }
  destroy(list, index) {
    list[index] = null
    list.splice(index, 1)
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
    // 在列表改变后
    this.refreshPointNearby()
  }
  refreshPointNearby(){
    let lastOne = this[this.length - 1]
    this.forEach(ele => {
      
    });
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
