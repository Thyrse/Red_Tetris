import PLayer from "./Player";

export const updatePlayerClientSide = (player, io) => {
  io.in(player.id).emit(UPDATE_PLAYER, {
    player: player.toObject(),
  });
};
