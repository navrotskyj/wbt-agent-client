

if (cli.agent && !cli.agent.refreshTask) {
    var channel = cli.agent.channels.filter(i => i.channel === 'call')[0];
    cli.agent.refreshTask = true;

    if (channel && channel.wrap_time_ids) {
        cli.reportingTask(channel.wrap_time_ids[0])
    }
}

for (var c on cli.allCall()) {
    if (c.allowReporting) {
        c.reporting();
        break;
    }
}
