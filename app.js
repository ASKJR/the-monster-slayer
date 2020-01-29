new Vue({
  el: "#app",
  data: {
    running: false,
    userLife: 100,
    monsterLife: 100,
    monsterAtk: 0,
    userAtk: 0,
    logs: []
  },
  methods: {
    attack: function() {
      this.userAtk = this.damage();
      this.monsterAtk = this.damage();
      this.userLife -= this.monsterAtk;
      this.monsterLife -= this.userAtk;
      this.writeLog("attack");
    },
    heal: function() {
      if (this.userLife < 100) {
        this.userLife += 10;
        this.monsterAtk = this.damage();
        this.userLife -= this.monsterAtk;
        this.writeLog("heal");
      }
    },
    damage: function() {
      return Math.floor(Math.random() * 20);
    },
    writeLog: function(action) {
      const monsterLog = {
        type: "monster",
        msg: "MONSTER HITS PLAYER FOR " + this.monsterAtk
      };

      let userLog = {};

      if (action == "attack") {
        userLog = {
          type: "user",
          msg: "PLAYER HITS MONSTER FOR " + this.userAtk
        };
      } else {
        userLog = {
          type: "user",
          msg: "PLAYER HEALS HIMSELF FOR 10"
        };
      }

      this.logs.unshift(userLog);
      this.logs.unshift(monsterLog);
    }
  }
});
