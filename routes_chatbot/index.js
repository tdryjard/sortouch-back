import questionChatbot from './creating_area/question.route'
import responseChatbot from './creating_area/reply.route'
import containerChatbot from './creating_area/container.route'
import relationChatbot from './creating_area/relation_container.route'
import categoryChatbot from './creating_area/category.route'
import mailChatbot from './mail.chatbot.route'
import contactChatbot from './contact.chatbot.route'

const cors = require('cors');

// NO CORS

router.use('/question', cors({credentials: false, origin: '*'}), questionChatbot);

router.use('/response', cors({credentials: false, origin: '*'}), responseChatbot);

router.use('/container', cors({credentials: false, origin: '*'}), containerChatbot)

router.use('/relation', cors({credentials: false, origin: '*'}), relationChatbot)

router.use('/category', cors({credentials: false, origin: '*'}), categoryChatbot)

router.use('/mail', cors({credentials: false, origin: '*'}), mailChatbot)

router.use('/contact', cors({credentials: false, origin: '*'}), contactChatbot)

// NO CORS