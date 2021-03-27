describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should do nothing if serverNameInput is empty', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should add td to #serverTable', function () {
    submitServerInfo();
    updateServerTable();
    let checkTd = document.querySelectorAll('#serverTable tbody tr td');
    expect(checkTd.length).toEqual(2);
    expect(checkTd[0].innerHTML).toEqual('Alice');
    expect(checkTd[1].innerHTML).toEqual('$0.00');
  });

  afterEach(function () {
    // teardown logic
    serverTbody.innerHTML = '';
    allServers = {};
    serverId = 0;
  });
});
