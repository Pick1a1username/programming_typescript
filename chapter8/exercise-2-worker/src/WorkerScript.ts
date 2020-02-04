import EventEmitter from 'events'

class SafeEmitter<
  Events extends Record<PropertyKey, unknown[]>
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

type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]

// type Command =
//   | {type: 'sendMessageToThread', data: [ThreadID, Message]}
//   | {type: 'createThread', data: [Participants]}
//   | {type: 'addUserToThread', data: [ThreadID, UserID]}
//   | {type: 'removeUserFromThread', data: [ThreadID, UserID]}

type Commands = {
  sendMessageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}

type Events = {
  receivedMessage: [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}

// Listen for events coming from the main thread
let commandEmitter = new SafeEmitter<Commands>()

// Emit events back to the main thread
let eventEmitter = new SafeEmitter<Events>()

// Wrap incoming commands from the main thread
// using our typesafe event emitter
onmessage = command =>
  commandEmitter.emit(
    command.data.type,
    ...command.data.data
  )

// onmessage = e => {
//   processCommandFromMainThread(e.data)
// }

// function processCommandFromMainThread(
//   command: Command
// ) {
//   switch (command.type) {
//     case 'sendMessageToThread':
//       let [threadID, message] = command.data
//       console.log(message)
//   }
// }

// Listen for events issued by the worker, and send them to the main thread
eventEmitter.on('receivedMessage', data =>
  postMessage({type: 'receivedMessage', data})
)
eventEmitter.on('createdThread', data =>
  postMessage({type: 'createdThread', data})
)
// etc.

// Respond to a sendMessageToThread command from the main thread
commandEmitter.on('sendMessageToThread', (threadID, message) =>
  console.log(`OK, I will send a message to threadID ${threadID}`)
)

// Send an event back to the main thread
eventEmitter.emit('createdThread', 123, [456, 789])