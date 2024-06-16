const {exec} = require("node:child_process")

//Funcao recursiva que ficara checkando se o postgres está aceitando conexões
function checkPostgres(){
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn)
  //stdout - retorna o log normal | stderr - retorna o log de erro
  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1){
      process.stdout.write('.');
      checkPostgres();
      return;
    }
    console.log("\n 🟢 O Postgres está aceitando conexões 🟢")
  }

}
process.stdout.write("\n \n🔴 Aguardando postgres aceitar conexões 🔴")

checkPostgres()