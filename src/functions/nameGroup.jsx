function nameGroup(members) {
    const groupUsernames = []
    members.map(member => groupUsernames.push(member.username));
    return groupUsernames.slice(0, groupUsernames.length - 1).join(', ') + ' & ' + groupUsernames.slice(groupUsernames.length - 1);
}

export default nameGroup;