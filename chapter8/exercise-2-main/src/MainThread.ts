import { Worker } from "cluster"
// import EventEmitter from 'events'
import { EventEmitter } from 'events'
// import * as events from 'events';

type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]

type Events = {
  receivedMessage:  [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}


type Commands = {
  sendMessageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThread: [ThreadID, UserID]
  removeUserFromThread: [ThreadID, UserID]
}


// https://github.com/Microsoft/TypeScript/issues/24945
// https://github.com/microsoft/TypeScript/issues/31393

class SafeEmitter<
  Events extends Record<string, unknown[]>
> {
  private emitter = new EventEmitter

  emit<K extends keyof Events>(
    channel: K,
    ...data: Events[K]
  ) {
    return this.emitter.emit(channel, ...data)
  }

  on<K extends keyof Events>(
    channel: K,
    listener: (...data: Events[K]) => void
  ) {
    return this.emitter.on(channel, listener)
  }
}



let commandEmitter = new SafeEmitter<Commands>()
let eventEmitter = new SafeEmitter<Events>()
let worker = new Worker('WorkerScript.js')

// Listen for events coming from our worker,
// and re-emit them using our typesafe event emitter
worker.onmessage = event =>
  eventEmitter.emit(
    event.data.type,
    ...event.data.data
  )

// worker.onmessage = e => {
//   console.log(e.data)
// }
// worker.postMessage('some data')

// Listen for commands issues by this thread, and send them to our worker
commandEmitter.on('sendMessageToThread', data =>
  worker.postMessage({type: 'sendMessageToThread', data})
)
commandEmitter.on('createThread', data =>
  worker.postMessage({type: 'createThread', data})
)
// etc.

// Do something when the worker tells us a new thread was created
eventEmitter.on('createdThread', (threadID, participants) =>
  console.log('Created a new chat thread!', threadID, participants)
)

// Send a command to our worker
commandEmitter.emit('createThread', [123, 456])

