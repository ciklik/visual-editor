<section class="py-5 text-center container" style="background-color:var(<?= $data['background'] ?? '--aze, white' ?>);">
  <div class="row py-lg-5">
    <div class="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light"><?= $data['title'] ?? 'Titre du héro'; ?></h1>
      <div class="lead text-muted"><?= $data['body'] ?? 'Ligne de texte'; ?></div>
      <p>
        <?php foreach(($data['actions'] ?? []) as $action): ?>
        <a href="<?= $action['url'] ?? '#' ?>" class="btn btn-<?= $action['type'] ?? 'primary' ?> my-2"><?= $action['label'] ?? 'Acheter' ?></a>
        <?php endforeach ?>
      </p>
    </div>
  </div>
</section>
