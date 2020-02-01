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
    newGame: function() {
      this.running = true;
      this.userLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack: function(special = false) {
      this.userAtk = special ? this.damage() * 4 : this.damage();
      this.monsterAtk = this.damage();
      this.decreaseUserLife();
      this.decreaseMonsterLife();
      this.writeLog("attack");
    },
    heal: function() {
      if (this.userLife < 100) {
        this.userLife += 10;
        if (this.userLife > 100) {
          this.userLife = 100;
        }
        this.monsterAtk = this.damage();
        this.decreaseUserLife();
        this.writeLog("heal");
      }
    },
    decreaseUserLife: function() {
      this.userLife -=
        this.userLife - this.monsterAtk <= 0 ? this.userLife : this.monsterAtk;
    },
    decreaseMonsterLife: function() {
      this.monsterLife -=
        this.monsterLife - this.userAtk <= 0 ? this.monsterLife : this.userAtk;
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
    },
    endGame: function(msg) {
      if (confirm(`${msg} New Game?`)) {
        this.newGame();
      } else {
        this.running = false;
      }
    }
  },
  watch: {
    monsterLife: function() {
      let msg = "";
      if (this.monsterLife == 0 && this.userLife > 0) {
        msg = "You Win!";
        this.endGame(msg);
      }

      if (this.userLife == 0 && this.monsterLife > 0) {
        msg = "You Lost!";
        this.endGame(msg);
      }

      if (this.userLife == 0 && this.monsterLife == 0) {
        msg = "It's a draw!";
        this.endGame(msg);
      }
    }
  }
});
