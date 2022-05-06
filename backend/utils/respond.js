const Respond = (data, status, ctx) => {
    ctx.body = data
    ctx.set('Content-Type', 'Application.json')
    ctx.status = status;
}

export default Respond