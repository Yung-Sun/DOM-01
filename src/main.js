const div = dom.create("<div>newDiv</div>")
console.log(div)
dom.after(div2, div)

const div3 = dom.create("<div id='parent'></div>")
dom.wrap(div2, div3)

dom.empty(empty)

dom.attr(div2, 'title', 'Giao')
let title = dom.attr(div2, 'title')
console.log(`title: ${title}`)

dom.text(div2, '这是新内容')

dom.style(div2, { border: '1px solid red', color: 'blue' })

console.log(dom.style(div2, 'border'))

dom.style(div2, 'border', '1px solid black')

dom.class.add(div2, 'red')
dom.class.add(div2, 'blue')
dom.class.remove(div2, 'red')
console.log(dom.class.contains(div2, 'red'))
const fn = () => { console.log('点击了') }
dom.on(div2, 'click', fn)
dom.off(div2, 'click', fn)

console.log(dom.find('#div2')[0])
const test1 = dom.find('#test')[0]
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test1)[0])
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(div2))
let sp2 = dom.find('#sp2')[0]
console.log(dom.siblings(sp2))
console.log(dom.next(sp2))
console.log(dom.previous(sp2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(sp2))