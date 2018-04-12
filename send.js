const amqp = require('amqplib/callback_api')
const q = 'channel_sub'

function bail (err) {
    console.error(err)
    process.exit(1)
}

// Publisher
function publisher (conn) {
    conn.createChannel((err, ch) => {

        const data = {
            "pattern": {"cmd":"sum"},
            "data": {
                'application': 'fkjakjshfkjshkjf',
                'environment': 'dadasdasda',
                'method': 'POST',
                'endpoint': '/test',
                'status_code': 200,
                'execution_time': 1234,
                'client_request_ip': '192.168.1.1',
                'request_headers': 'aaaa',
                'request_body': 'fffff',
                'response_headers': 'fgffgggf',
                'response_body': 'rrsfsfs'
            }
        }
        // const data = {
        //     'application': 'fkjakjshfkjshkjf',
        //     'environment': 'dadasdasda',
        //     'method': 'POST',
        //     'endpoint': '/test',
        //     'status_code': 200,
        //     'execution_time': 1234,
        //     'client_request_ip': '192.168.1.1',
        //     'request_headers': 'aaaa',
        //     'request_body': 'fffff',
        //     'response_headers': 'fgffgggf',
        //     'response_body': 'rrsfsfs'
        // }

        if (err != null) bail(err)
        ch.assertQueue(q)

        // for (let i = 0; i < 100000; i++) {
        //   ch.sendToQueue(q, Buffer.from(JSON.stringify(data)))
        // }

        let sent = 1
        setInterval(() => {
            ch.sendToQueue(q, Buffer.from(JSON.stringify(data)))
            console.log(sent)
            sent++
        })
    })
}

amqp.connect('amqp://172.17.0.2', function (err, conn) {
    if (err != null) bail(err)
    publisher(conn)
})