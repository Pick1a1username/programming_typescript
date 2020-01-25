/**
 * The types of nodes:
 * 
 * 1. Regular TreeNodes
 * 2. LeafNodes, which are TreeNodes that don't have children
 * 3. InnerNodes, which are TreeNodes that do have children
 */

 // Declare types for nodes.
type TreeNode = {
    value: string
}

type LeafNode = TreeNode & {
    isLeaf: true
}

type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode]
}

function mapNode<T extends TreeNode>(
    node: T,
    f: (value: string) => string
): T {
    return {
        ...node,
        value: f(node.value)
    }
}


let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}

let a1 = mapNode(a, _ => _.toUpperCase()) // TreeNode
let b1 = mapNode(b, _ => _.toUpperCase()) // TreeNode
let c1 = mapNode(c, _ => _.toUpperCase()) // TreeNode

console.log(a1)
console.log(b1)
console.log(c1)