begin
  require "rspec/core/rake_task"

  namespace :spec do
    desc "Run all specs"
    RSpec::Core::RakeTask.new(:all) do |t|
      t.pattern = "spec/**/*_spec.rb"
    end
  end

  task default: "spec:all"

  # Replace Rails default test:* tasks
  namespace :test do
    task all: [ "spec:all" ]
    task single: [ "spec:all" ]
    task controllers: [ "spec:controllers" ]
    task models: [ "spec:models" ]
  end
rescue LoadError
  # No RSpec available
end
