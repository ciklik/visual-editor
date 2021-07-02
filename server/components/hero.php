<section class="py-5 text-center container">
  <div class="row py-lg-5">
    <div class="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light"><?= $data['title'] ?? ''; ?></h1>
      <p class="lead text-muted"><?= $data['body'] ?? ''; ?></p>
      <p>
        <?php foreach(($data['actions'] ?? []) as ['action' => $action]): ?>
        <a href="<?= $action['href'] ?? '#' ?>" class="btn btn-<?= $action['type'] ?? 'primary' ?> my-2"><?= $action['title'] ?? 'Acheter' ?></a>
        <?php endforeach ?>
      </p>
    </div>
  </div>
</section>
